def get_greeting(message):
    """
    Responds with a greeting and provides information about the services available at Vista Adult Daycare Center.
    """
    text = """Hello Im Rosa and welcome to Vista Adult Daycare Center! I’m here to assist you with any questions you may have. We offer services like information about the center, meal options, upcoming events, and even an AI-powered health care bot. Let me know if you need any information on the services we offer!"""
    return text


def get_goodbye(message):
    """
    Responds with a farewell message when the user finishes the interaction.
    """
    text = """Thank you for visiting Vista Adult Daycare Center! It was a pleasure chatting with you. If you need anything in the future, don’t hesitate to reach out. Take care and have a wonderful day ahead!"""
    return text


def get_contact_info(message):
    """
    Provides contact information for Vista Adult Daycare Center.
    """
    text = """For more information or assistance, please feel free to reach out to us:
            Vista Adult Daycare Center
            Address: 123 Wellness Ave, Suite 101, Healthy City, HC 45678
            Phone: (555) 987-6543
            Email: info@vistaadhc.com
            Website: www.vistadaycare.com
            We’re here to help, and we look forward to hearing from you! 
            To schedule a visit or learn more, fill out our "Come and Visit Us" form with your contact information."""
    return text


def handle_unknown(message):
    """
    Handles unknown messages by asking for clarification or further information.
    """
    text = """Thank you for reaching out to Vista Adult Daycare Center. I’m sorry, but I wasn’t able to understand your request. Could you please clarify your question or let me know how I can assist you? Whether you need information about our services, meal options, events, or health care support, I’m here to help in any way I can."""
    return text


def get_services_info(message):
    """
    Provides information about the services offered at Vista Adult Daycare.
    """
    text = """At Vista Adult Daycare, we provide a variety of services including safe transportation, nutritious meals, social activities, various events and fitness programs. Our friendly staff ensures personalized care, while our nursing team offers health support throughout the day. Join us for a caring, engaging, and enjoyable experience!"""
    return text


def get_staff_info(message):
    """
    Provides information about the staff offered at Vista Adult Daycare.
    """
    text = """Our dedicated staff at Vista Adult Daycare are here to provide personalized care and support throughout the day. From experienced caregivers to our nursing team, we ensure a safe and compassionate environment. Our friendly professionals are always ready to assist with anything you need!"""
    return text


def get_thanks(message):
    """
    Provides thankyou message
    """
    text = """You’re very welcome! If you need more assistance or have any other questions regarding the meals, events, health therapy, contact info, feel free to ask."""
    return text
