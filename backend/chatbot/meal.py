from core.meal_service import get_meals_for_date
from core.utils import extract_date
from datetime import datetime


def get_meal_info(message):
    """
    Identifies the meal in the message and gets the meal for the particular date
    """
    date = extract_date(message)
    meals = get_meals_for_date(date)
    today = datetime.today().strftime("%Y-%m-%d")
    if meals:
        meal_list = ", ".join(
            f"{meal['meal_name']} - {meal['quantity']}" for meal in meals
        )
        if date == today:
            return f"Here is the menu for today: {meal_list}"
        else:
            return f"Here is the menu for the given date: {meal_list}"
    else:
        return f"Sorry, no meal plan available for {date}."
