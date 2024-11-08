import random
import requests
from chatbot.default import get_greeting, get_goodbye, get_contact_info, get_services_info, handle_unknown, get_staff_info
from chatbot.event import get_event_info
from chatbot.meal import get_meal_info
from chatbot.consultant import get_health_therapy_info
from chatbot.process_text import process_and_identify

# Extended list of key words
MEAL_KEYWORDS = [
    'meal', 'food', 'breakfast', 'lunch', 'dinner', 'snack', 'brunch', 'supper', 
    'tea', 'midnight snack', 'supper', 'dish', 'cuisine', 'menu'
]

EVENT_KEYWORDS = [
    'event', 'party', 'meeting', 'conference', 'seminar', 'workshop', 'webinar', 
    'gathering', 'celebration', 'birthday', 'wedding', 'conference call', 'networking', 
    'class', 'course', 'exhibition', 'festival', 'show', 'performance', 'concert', 
    'panel', 'presentation', 'ceremony', 
    'together', 'reunion', 'launch', 'event details'
]

GREETING_KEYWORDS = [
    'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 
    'morning', 'afternoon', 'evening', 'yo', 'greetings', 'sup', 'howdy', "about"
]

GOODBYE_KEYWORDS = [
    'bye', 'goodbye', 'later', 'bye bye', 'peace', 'farewell', 'adios'
]

HEALTH_THERAPY_KEYWORDS = [
    'health', 'therapy', 'consultation', 'doctor', 'counseling', 'psychologist', 'mental', 
    'wellness', 'session', 'treatment', 'healthcare', 'therapy center', 'medical',
]

CONTACT_INFO_KEYWORDS = [
    'contact', 'phone', 'email', 'address', 'location', 'hours', 'reach', 
    'telephone', 'office', "info", "help"
]

SERVICES_KEYWORDS = [
    'service', 'offer', 'features', 'offer', 'fun', 'activities'
]

STAFF_KEYWORDS = [
    'staff', 'team', 'caregivers', 'nurses', 'nursing', 'employees', 
    'professionals', 'doctors', 'medical staff', 
    'support staff', 'providers',  'associates',
    'trained', 'staff expertise', 'dedicated', 
]

def identify_intent(user_message):
    """Handle the user message, identify intent, extract the date, and return the response."""
    if process_and_identify(user_message, MEAL_KEYWORDS):
        intent = "meal"
    elif process_and_identify(user_message, EVENT_KEYWORDS):
        intent = "event"
    elif process_and_identify(user_message, GREETING_KEYWORDS):
        intent = "greeting"
    elif process_and_identify(user_message, GOODBYE_KEYWORDS):
        intent = "goodbye"
    elif process_and_identify(user_message, HEALTH_THERAPY_KEYWORDS):
        intent = "health_therapy"
    elif process_and_identify(user_message, CONTACT_INFO_KEYWORDS):
        intent = "contact_info"
    elif process_and_identify(user_message, SERVICES_KEYWORDS):
        intent = "services"
    elif process_and_identify(user_message, STAFF_KEYWORDS):
        intent = "staff"
    else:
        intent = "unknown"
    return intent


def handle_new_message(user_message):
    intent = identify_intent(user_message)
    service_function_map = {
        "greeting": get_greeting,
        "goodbye": get_goodbye,
        "meal": get_meal_info,
        "event": get_event_info,
        "health_therapy": get_health_therapy_info,
        "contact_info": get_contact_info,
        "services": get_services_info, 
        "staff": get_staff_info,
        "unknown": handle_unknown
    }
    return service_function_map[intent](user_message)
