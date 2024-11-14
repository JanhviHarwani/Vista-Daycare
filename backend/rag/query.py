import pinecone
import openai
import json
from config import Config

pinecone_client = pinecone.Pinecone(api_key=Config.pinecone)
openai.api_key = Config.openapi
index = pinecone_client.Index(Config.pinecone_index_name)

# Function to generate embeddings using OpenAI API (updated)
def generate_embedding(text):
    response = openai.embeddings.create(
        input=[text], model="text-embedding-ada-002")
    return response.data[0].embedding


def generate_gpt_response(query, similar_results):
    context = "\n".join([result['metadata']['answer']
                        for result in similar_results])
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": query},
        {"role": "assistant", "content": context}
    ]
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7,
        max_tokens=150
    )
    return response.choices[0].message.content.strip()

# Function to search for similar questions in Pinecone
def search_similar_questions(query, top_k=3):
    query_embedding = generate_embedding(query)
    # Update query() with keyword arguments
    result = index.query(vector=query_embedding,
                         top_k=top_k, include_metadata=True)
    return result['matches']

# Function to answer a user's question
def answer_question(query):
    similar_results = search_similar_questions(query)
    response = generate_gpt_response(query, similar_results)
    return response

# Main entry to query and get an answer from Pinecone
def user_question(user_query):
    response = answer_question(user_query)
    return response
