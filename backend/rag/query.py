import pinecone
import openai
import json
from config import Config

# Initialize Pinecone and OpenAI API keys
pinecone_client = pinecone.Pinecone(api_key=Config.pinecone)
openai.api_key = Config.openapi
index = pinecone_client.Index(Config.pinecone_index_name)

# Function to generate embeddings using OpenAI API
def generate_embedding(text):
    response = openai.Embedding.create(input=[text], model="text-embedding-ada-002")
    return response['data'][0]['embedding']

# Function to generate GPT response based on retrieved data
def generate_gpt_response(query, similar_results):
    context = "\n".join([result['metadata']['answer'] for result in similar_results])
    prompt = f"Question: {query}\n\nContext:\n{context}\n\nAnswer:"
    response = openai.Completion.create(
        model="gpt-3.5-turbo",
        prompt=prompt,
        temperature=0.7,
        max_tokens=150
    )
    return response.choices[0].text.strip()

# Function to search for similar questions in Pinecone
def search_similar_questions(query, top_k=3):
    query_embedding = generate_embedding(query)
    result = index.query(query_embedding, top_k=top_k, include_metadata=True)
    return result['matches']

# Function to answer a user's question
def answer_question(query):
    similar_results = search_similar_questions(query)
    response = generate_gpt_response(query, similar_results)
    return response

# Main entry to query and get an answer from Pinecone
def main():
    user_query = input("signs of aging")
    response = answer_question(user_query)
    print(f"Answer: {response}")

if __name__ == "__main__":
    main()
