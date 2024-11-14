import pinecone
import openai
import hashlib
import json
import os
from config import Config

pinecone_client = pinecone.Pinecone(api_key=Config.pinecone)
openai.api_key = Config.openapi
index = None


def create_index_if_not_exists(dimension=1536):
    global index
    index_name = Config.pinecone_index_name
    response = pinecone_client.list_indexes()
    indexes = response.get('indexes', [])
    if not any(index['name'] == index_name for index in indexes):
        print(f"Index {index_name} does not exist. Creating a new index.")
        pinecone_client.create_index(
            name=index_name,
            dimension=dimension,
            metric="cosine",
            spec=pinecone.ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
    else:
        print(f"Index {index_name} already exists. Skipping creation.")
    # Initialize the index after creation or check
    index = pinecone_client.Index(index_name)

# Using the updated OpenAI API call for generating embeddings
def generate_embedding(text):
    response = openai.embeddings.create(
        input=[text], model="text-embedding-ada-002")
    return response.data[0].embedding

# Function to generate a hash for checking duplicate entries
def generate_hash(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()

# Function to check if a question-answer pair is already in the index based on metadata (hash)
def is_duplicate(qa_pair, threshold=0.95):
    question_embedding = generate_embedding(qa_pair["question"])
    answer_embedding = generate_embedding(qa_pair["answer"])
    qa_pair_hash = generate_hash(qa_pair["question"] + qa_pair["answer"])
    result = index.query(vector=question_embedding,
                         top_k=1, include_metadata=True)
    if result['matches']:
        for match in result['matches']:
            if match['metadata']['qa_hash'] == qa_pair_hash:
                return True
    return False

# Function to insert Q&A pairs into Pinecone with duplicate checks
def upsert_data(qa_pairs):
    vectors = []
    for qa in qa_pairs:
        if not is_duplicate(qa):
            question_embedding = generate_embedding(qa["question"])
            answer_embedding = generate_embedding(qa["answer"])
            qa_pair_hash = generate_hash(qa["question"] + qa["answer"])

            vectors.append((qa_pair_hash, question_embedding, {
                           'question': qa["question"], 'type': 'question', 'qa_hash': qa_pair_hash}))
            vectors.append((qa_pair_hash, answer_embedding, {
                           'answer': qa["answer"], 'type': 'answer', 'qa_hash': qa_pair_hash}))
        else:
            print(
                f"Duplicate found for question: '{qa['question']}' and answer: '{qa['answer']}'. Skipping insertion.")
    if vectors:
        print(f"Upserting {len(vectors)} vectors to Pinecone.")
        index.upsert(vectors)
    else:
        print("No new data to upsert.")


def read_qa_pairs_from_json(filename):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, filename)
    with open(file_path, "r") as file:
        return json.load(file)


def init_update():
    # Step 1: Create the index if it does not exist
    create_index_if_not_exists()

    # Step 2: Read Q&A pairs from the JSON file
    qa_pairs = read_qa_pairs_from_json("questions.json")

    # Step 3: Upsert data into Pinecone
    upsert_data(qa_pairs)
