from core.meal_service import get_meals_for_date
from core.utils import extract_date

def get_meal_info(message):
    date = extract_date(message)
    meals = get_meals_for_date(date)
    
    # Respond based on whether meals are found
    if meals:
        meal_list = "\n".join(meals)
        return f"Here are the meals for {date}:\n{meal_list}"
    else:
        return f"Sorry, no meal plan available for {date}."
