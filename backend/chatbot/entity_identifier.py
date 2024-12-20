import random
import requests
from chatbot.default import (
    get_greeting,
    get_goodbye,
    get_contact_info,
    get_services_info,
    handle_unknown,
    get_staff_info,
    get_thanks,
)
from chatbot.event import get_event_info
from chatbot.meal import get_meal_info
from chatbot.consultant import get_health_therapy_info
from chatbot.process_text import process_and_identify, process_keywords


# Extended list of key words
MEAL_KEYWORDS = process_keywords([
    'meal', 'food', 'breakfast', 'lunch', 'dinner', 'snack', 'brunch', 'supper',
    'tea', 'midnight snack', 'supper', 'dish', 'cuisine', 'menu'
])

EVENT_KEYWORDS = process_keywords([
    'event', 'party', 'meeting', 'conference', 'seminar', 'workshop', 'webinar',
    'gathering', 'celebration', 'birthday', 'wedding', 'conference call', 'networking',
    'class', 'course', 'exhibition', 'festival', 'show', 'performance', 'concert',
    'panel', 'presentation', 'ceremony',
    'together', 'reunion', 'launch', 'event details'
])

GREETING_KEYWORDS = process_keywords([
    'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
    'morning', 'afternoon', 'evening', 'yo', 'greetings', 'sup', 'howdy', 'about',
    'help',
])

GOODBYE_KEYWORDS = process_keywords([
    'bye', 'goodbye', 'later', 'bye bye', 'peace', 'farewell', 'adios', 'goodbye'
])

HEALTH_THERAPY_KEYWORDS = process_keywords([
    'health', 'therapy', 'consultation', 'doctor', 'counseling', 'psychologist', 'mental',
    'wellness', 'session', 'treatment', 'healthcare', 'therapy center', 'medical', 
    'memory', 'exercises', 'arthritis', 'muscle', 'anxiety', 'sleep', 'pain', 'pressure',
    'fatigue', 'falls', 'skin', 'appetite', 'balance', 'cognition', 'loneliness', 'chronic',
    'food', 'irritability', 'osteoporosis', 'sadness', 'independence', 'diabetes', 'hearing',
    'vision', 'blurry', 'dementia', 'sharpness', 'dizziness', 'cholesterol', 'grief', 'weight',
    'depression', 'dehydration', 'infections', 'swelling', 'incontinence', 'digestion',
    'forgetfulness', 'heart', 'bruising', 'sugar', 'asthma', 'spots', 'signs', 'aches', 'stress',
    'cancer', 'teeth', 'brain', 'blood', 'back', 'ankles', 'utis', 'management', 'circulation',
    'cold', 'cramps', 'constipation', 'lonely', 'alzheimer', 'posture', 'headaches', 'mobility', 'breath',
    'bones', 'disease', 'system', 'drymouth', 'hair', 'loss', 'stroke', 'hydration', 'therapy',
    'socializing', 'medication', 'inhalers', 'hygiene', 'support', 'movement', 'relief', 'diet', 'lung',
    'cognitive', 'coping', 'mindfulness', 'routine', 'tests', 'plan', 'vaccinations', 'sunscreen',
    'compression', 'acupuncture', 'geriatrics', 'nutrition', 'taichi', 'bladder', 'caregiver',
    'companionship', 'tinnitus', 'supplements', 'wellness', 'rehabilitation', 'prevention', 'resilience',
    'surgery', 'loss', 'fitness', 'clarity', 'stretching', 'management', 'correction', 'assessment',
    'habit', 'illness', 'wellbeing', 'prevention', 'relaxation', 'clarity', 'function', 'omega',
    'fats', 'cognition', 'mental', 'pain', 'medication', 'vision', 'routine', 'bp', 'healthy', 
    'sick', 'burn', 'burnout'
])


CONTACT_INFO_KEYWORDS = process_keywords([
    'contact', 'phone', 'email', 'address', 'location', 'hours', 'reach',
    'telephone', 'office', 'info', 'emergency'
])

SERVICES_KEYWORDS = process_keywords([
    'service', 'offer', 'features', 'offer', 'fun', 'activities'
])

STAFF_KEYWORDS = process_keywords([
    'staff', 'team', 'caregivers', 'nurses', 'nursing', 'employees',
    'professionals', 'doctors', 'medical staff',
    'support staff', 'providers',  'associates',
    'trained', 'staff expertise', 'dedicated',
])

THANK_KEYWORDS = process_keywords([
    'thank', 'thanks', 'welcome', 'appreciate', 'grateful', 
    'obliged', 'thankful', 'appreciated', 'gratitude', 
    'grateful', 'bless', 'gratefully', 'indebted', 'please',
])


def identify_intent(user_message):
    """
    Handle the user message, identify intent, extract the date, and return the response.
    """
    if process_and_identify(user_message, MEAL_KEYWORDS):
        intent = "meal"
    elif process_and_identify(user_message, EVENT_KEYWORDS):
        intent = "event"
    elif process_and_identify(user_message, CONTACT_INFO_KEYWORDS):
        intent = "contact_info"
    elif process_and_identify(user_message, SERVICES_KEYWORDS):
        intent = "services"
    elif process_and_identify(user_message, STAFF_KEYWORDS):
        intent = "staff"
    elif process_and_identify(user_message, HEALTH_THERAPY_KEYWORDS):
        intent = "health_therapy"
    elif process_and_identify(user_message, THANK_KEYWORDS):
        intent = "thanks"
    elif process_and_identify(user_message, GREETING_KEYWORDS):
        intent = "greeting"
    elif process_and_identify(user_message, GOODBYE_KEYWORDS):
        intent = "goodbye"
    else:
        intent = "unknown"
    return intent


def handle_new_message(user_message):
    """
    Handles the type of intent of the message
    """
    intent = identify_intent(user_message)
    service_function_map = {
        "greeting": get_greeting,
        "goodbye": get_goodbye,
        "thanks": get_thanks,
        "meal": get_meal_info,
        "event": get_event_info,
        "health_therapy": get_health_therapy_info,
        "contact_info": get_contact_info,
        "services": get_services_info,
        "staff": get_staff_info,
        "unknown": handle_unknown,
    }
    return service_function_map[intent](user_message)
