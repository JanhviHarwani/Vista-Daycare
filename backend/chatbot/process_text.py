import spacy
import nltk
from nltk.stem import PorterStemmer

nltk.download('punkt')
nlp = spacy.load("en_core_web_sm")
stemmer = PorterStemmer()


def process_words(words):
    """Stem and lemmatize a list of words."""
    stemmed_words = [stemmer.stem(word) for word in words]
    lemmatized_words = [nlp(word)[0].lemma_ for word in words]
    processed_words = stemmed_words + lemmatized_words
    return processed_words


def process_keywords(keyword_list):
    """Process the keyword list by stemming and lemmatizing all the keywords."""
    return process_words(keyword_list)


def process_message(message):
    """Process the user message by applying both stemming and lemmatization."""
    doc = nlp(message.lower())
    processed_words = process_words(
        [token.text for token in doc if not token.is_stop])
    return processed_words


def process_and_identify(message, keyword_list):
    """Match the processed user message with processed keyword list."""
    processed_message = process_message(message)
    processed_keywords = process_keywords(keyword_list)
    for word in processed_message:
        if word in processed_keywords:
            return True
    return False
