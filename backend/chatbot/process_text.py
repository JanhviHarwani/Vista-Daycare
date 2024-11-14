import spacy
import nltk
from nltk.stem import PorterStemmer


nltk.download("punkt")
nlp = spacy.load("en_core_web_sm")
stemmer = PorterStemmer()



def process_words(word):
    """Stem and lemmatize a list of words."""
    stemmed_word = stemmer.stem(word)
    lemmatized_only_word = nlp(word)[0].lemma_
    lemmatized_word = nlp(stemmed_word)[0].lemma_ 
    processed_words = [stemmed_word, lemmatized_word, lemmatized_only_word, word]
    return processed_words


def process_keywords(keyword_list):
    """Process the keyword list by stemming and lemmatizing all the keywords."""
    processed_words = []
    for word in keyword_list:
        processed_words += process_words(word)
    return processed_words


def process_message(message):
    """Process the user message by applying both stemming and lemmatization."""
    messages = message.lower().split()
    processed_words = []
    for word in messages:
        print(word, process_words(word))
        processed_words += process_words(word)
    print(processed_words)
    return processed_words


def process_and_identify(message, keyword_list):
    """Match the processed user message with processed keyword list."""
    processed_message = process_message(message+ " ")
    processed_keywords = process_keywords(keyword_list)
    print(processed_message)
    print(processed_keywords)

    for word in processed_message:
        if word in processed_keywords:
            return True
    return False
