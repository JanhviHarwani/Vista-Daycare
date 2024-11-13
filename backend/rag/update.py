# update.py

import pinecone
import hashlib
import json
import os
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from config import Config

# Initialize Pinecone client using the provided API key from Config
pinecone_client = pinecone.Pinecone(api_key=Config.pinecone)

# Initialize GPT-2 model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Set the eos_token as the padding token
tokenizer.pad_token = tokenizer.eos_token  # Use eos_token as pad_token

model = GPT2LMHeadModel.from_pretrained("gpt2")

# Initialize Pinecone index (this will be done after index creation)
index = None

# Function to create Pinecone index if it doesn't already exist
def create_index_if_not_exists(dimension=1536):
    response = pinecone_client.list_indexes()
    indexes = response.get('indexes', [])
    index_name = Config.pinecone_index_name
    
    # Check if the index exists by name
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
    
    # Initialize the index after creation
    global index
    index = pinecone_client.Index(index_name)

# Function to generate a hash for the given text (used for checking duplicates)
def generate_hash(text):
    return hashlib.md5(text.encode('utf-8')).hexdigest()

# Function to generate embeddings (you can replace this with actual embedding models)
def generate_embedding(text):
    # Tokenize the text (GPT-2 tokenizer)
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    # Forward pass to get token embeddings
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Extract token embeddings (the last hidden state)
    token_embeddings = outputs.last_hidden_state
    
    # Take the mean of the token embeddings to generate a single vector
    embedding = token_embeddings.mean(dim=1)  # Mean across the token dimension

    # Convert the tensor to a list of floats (to be compatible with Pinecone)
    return embedding.squeeze().float().tolist()  # Squeeze in case it's a batch and convert to list

# Function to check if a question-answer pair is already in the Pinecone index based on metadata (hash)
def is_duplicate(qa_pair, threshold=0.95):
    question_embedding = generate_embedding(qa_pair["question"])
    qa_pair_hash = generate_hash(qa_pair["question"] + qa_pair["answer"])
    
    # Query Pinecone to find if the embedding already exists (use keyword arguments)
    result = index.query(
        vector=question_embedding,  # Pass the embedding as a vector
        top_k=1,  # Number of similar results you want
        include_metadata=True  # Include metadata in the response
    )
    
    # If a match is found, check if the hash is the same
    if result['matches']:
        for match in result['matches']:
            if match['metadata']['qa_hash'] == qa_pair_hash:
                return True
    return False

# Function to upsert question-answer pairs into Pinecone with duplicate check
def upsert_data(qa_pairs):
    vectors = []
    for qa in qa_pairs:
        if not is_duplicate(qa):
            question_embedding = generate_embedding(qa["question"])
            answer_embedding = generate_embedding(qa["answer"])
            
            qa_pair_hash = generate_hash(qa["question"] + qa["answer"])

            vectors.append((qa_pair_hash, question_embedding, {'question': qa["question"], 'type': 'question', 'qa_hash': qa_pair_hash}))
            vectors.append((qa_pair_hash, answer_embedding, {'answer': qa["answer"], 'type': 'answer', 'qa_hash': qa_pair_hash}))
        else:
            print(f"Duplicate found for question: '{qa['question']}' and answer: '{qa['answer']}'. Skipping insertion.")

    if vectors:
        print(f"Upserting {len(vectors)} vectors to Pinecone.")
        index.upsert(vectors)
    else:
        print("No new data to upsert.")

# Function to read question-answer pairs from a JSON file
def read_qa_pairs_from_json(filename):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, filename)

    with open(file_path, "r") as file:
        return json.load(file)

# Function to initialize the process (creates the index and upserts data)
def init_update():
    create_index_if_not_exists()
    qa_pairs = read_qa_pairs_from_json("questions.json")
    upsert_data(qa_pairs)
