import pinecone
import openai
import json
from config import Config

pinecone_client = pinecone.Pinecone(api_key=Config.pinecone)
openai.api_key = Config.openapi
index = pinecone_client.Index(Config.pinecone_index_name)


def generate_embedding(text):
    """
    Function to generate embeddings using OpenAI API
    """
    response = openai.embeddings.create(input=[text], model="text-embedding-ada-002")
    return response.data[0].embedding


def get_content():
    """
    Gets the user context of the large language model
    """
    text = "You are a AI health care and therapy chatbot for vista adult daycare. You need to be able to manage questions around common diseases. The daycare offers services like transport, socialising, food, gym and a nurse for basic health checkups. If you cannot answer questions plese ask to contact the health care specialist at vista for further . Please try to prioritise info in the assistant part"
    return text


def generate_gpt_response(query, similar_results):
    """
    Generates the response using RAG and GPT
    """
    context = "\n".join([result["metadata"]["answer"] for result in similar_results])
    messages = [
        {"role": "system", "content": get_content()},
        {"role": "user", "content": query},
        {"role": "assistant", "content": context},
    ]
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo", messages=messages, temperature=0.7, max_tokens=150
    )
    return response.choices[0].message.content.strip()


def search_similar_questions(query, top_k=3):
    """
    Function to search for similar questions in Pinecone
    """
    query_embedding = generate_embedding(query)
    result = index.query(vector=query_embedding, top_k=top_k, include_metadata=True)
    return result["matches"]


def answer_question(query):
    """
    Function to answer a user's question
    """
    similar_results = search_similar_questions(query)
    response = generate_gpt_response(query, similar_results)
    return response


def user_question(user_query):
    """
    Main entry to query and get an answer from Pinecone
    """
    response = answer_question(user_query)
    return response
