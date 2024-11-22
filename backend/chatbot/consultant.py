from rag.query import user_question


def get_health_therapy_info(message):
    """
    Queries the vector db and uses RAG for framing the answer
    """
    return user_question(message)
