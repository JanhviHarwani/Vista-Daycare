import re
from datetime import datetime
import dateparser


def is_valid_date(date_str):
    pattern = r"^\d{4}-\d{2}-\d{2}$"
    if not re.match(pattern, date_str):
        return False

    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def is_valid_time(time_str):
    pattern = r"^\d{2}:\d{2}$"
    if not re.match(pattern, time_str):
        return False
    try:
        datetime.strptime(time_str, "%H:%M")
        return True
    except ValueError:
        return False


def extract_date(user_input):
    """
    Extracts a date from the user input. If no date is found, it returns today's date
    """
    user_input = user_input.strip()
    date_pattern = r"(\d{2}[-/]\d{2}[-/]\d{2,4}|\d{4}-\d{2}-\d{2})"
    date_match = re.search(date_pattern, user_input)

    if date_match:
        matched_date = date_match.group(0)
        parsed_date = dateparser.parse(matched_date)
        if parsed_date:
            return parsed_date.strftime("%Y-%m-%d")

    date_keywords = ["yesterday", "today", "tomorrow", "next", "last"]
    matched_keywords = [word for word in date_keywords if word in user_input.lower()]

    if matched_keywords:
        date_phrase = matched_keywords[0]
        parsed_date = dateparser.parse(date_phrase)
        if parsed_date:
            return parsed_date.strftime("%Y-%m-%d")

    today_date = datetime.today().strftime("%Y-%m-%d")
    return today_date


def get_current_date():
    return datetime.today().strftime("%Y-%m-%d")
