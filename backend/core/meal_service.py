import boto3
from botocore.exceptions import ClientError
from config import Config


table = Config.init_meal_table()


def get_meals_for_date(meal_date):
    """
    Fetch meals for a specific date.
    """
    try:
        response = table.query(
            KeyConditionExpression="meal_date = :meal_date",
            ExpressionAttributeValues={":meal_date": meal_date},
        )
        if "Items" in response and response["Items"]:
            meal_data = [
                {
                    "meal_name": item["meal_name"],
                    "quantity": item.get("quantity", "1pc"),
                }
                for item in response["Items"]
            ]
            return meal_data
        else:
            return []
    except ClientError as e:
        print(f"Error querying DynamoDB: {e}")
        return []


def insert_meal(meal_date, meal_name, quantity):
    """
    Insert one or more meals into the database.
    """
    try:
        table.put_item(
            Item={"meal_date": meal_date, "meal_name": meal_name, "quantity": quantity}
        )
        return {"message": f"Meals inserted successfully"}, 201
    except ClientError as e:
        print(f"Error inserting meals into DynamoDB: {e}")
        return {"error": "Failed to insert meal(s)"}, 500


def delete_meal(meal_date, meals):
    """
    Delete one or more meals from the database.
    """
    if isinstance(meals, str):
        meals = [meals]

    try:
        for meal_name in meals:
            table.delete_item(Key={"meal_date": meal_date, "meal_name": meal_name})
        return {"message": f"{len(meals)} meal(s) deleted successfully"}, 200
    except ClientError as e:
        print(f"Error deleting meal(s) from DynamoDB: {e}")
        return {"error": "Failed to delete meal(s)"}, 500


def update_meal(meal_date, old_meal, new_meal, quantity=None):
    """
    Update meal for a specific date.
    """
    try:
        update_expression = "set meal_name = :new_meal"
        expression_attribute_values = {":new_meal": new_meal}

        if quantity:
            update_expression += ", quantity = :quantity"
            expression_attribute_values[":quantity"] = quantity

        table.update_item(
            Key={"meal_date": meal_date, "meal_name": old_meal},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
        )
        return {
            "message": f"Meal '{old_meal}' updated to '{new_meal}' with quantity '{quantity}'"
        }, 200
    except ClientError as e:
        print(f"Error updating meal: {e}")
        return {"error": "Failed to update meal"}, 500


def get_all_meals():
    """
    Get all meals sorted by meal date.
    """
    try:
        response = table.scan()
        if "Items" in response and response["Items"]:
            meals = [
                {
                    "meal_date": item["meal_date"],
                    "meal_name": item["meal_name"],
                    "quantity": item.get("quantity", "1pc"),
                }
                for item in response["Items"]
            ]
            meals.sort(key=lambda x: x["meal_date"], reverse=True)
            return meals
        else:
            return []
    except ClientError as e:
        print(f"Error scanning meals: {e}")
        return []
