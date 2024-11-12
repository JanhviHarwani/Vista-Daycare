from botocore.exceptions import ClientError
from config import Config

table = Config.init_meal_table()

def get_meals_for_date(meal_date):
    """Fetch meals for a specific date."""
    try:
        response = table.query(
            KeyConditionExpression="meal_date = :meal_date",
            ExpressionAttributeValues={":meal_date": meal_date}
        )
        if 'Items' in response and response['Items']:
            meal_names = [item['meal_name'] for item in response['Items']]
            return meal_names
        else:
            return []
    except ClientError as e:
        print(f"Error querying DynamoDB: {e}")
        return []

def insert_meal(meal_date, meals):
    """Insert one or more meals into the database."""
    if isinstance(meals, str):
        meals = [meals]

    existing_meals = get_meals_for_date(meal_date)
    merged_meals = set(existing_meals + meals)

    try:
        for meal_name in merged_meals:
            table.put_item(Item={'meal_date': meal_date, 'meal_name': meal_name})
        return {"message": f"Meals inserted successfully"}, 201
    except ClientError as e:
        print(f"Error inserting meals into DynamoDB: {e}")
        return {"error": "Failed to insert meal(s)"}, 500

def delete_meal(meal_date, meals):
    """Delete one or more meals from the database."""
    if isinstance(meals, str):
        meals = [meals]

    try:
        for meal_name in meals:
            table.delete_item(Key={'meal_date': meal_date, 'meal_name': meal_name})
        return {"message": f"{len(meals)} meal(s) deleted successfully"}, 200
    except ClientError as e:
        print(f"Error deleting meal(s) from DynamoDB: {e}")
        return {"error": "Failed to delete meal(s)"}, 500

def update_meal(meal_date, old_meal, new_meal):
    """Update meal for a specific date."""
    try:
        table.update_item(
            Key={'meal_date': meal_date, 'meal_name': old_meal},
            UpdateExpression="set meal_name = :new_meal",
            ExpressionAttributeValues={':new_meal': new_meal}
        )
        return {"message": f"Meal '{old_meal}' updated to '{new_meal}'"}, 200
    except ClientError as e:
        print(f"Error updating meal: {e}")
        return {"error": "Failed to update meal"}, 500
