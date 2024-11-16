import boto3
from botocore.exceptions import ClientError
from config import Config
from core.utils import get_current_date


table = Config.init_event_table()


def insert_event(event_date, event_name, start_time, end_time, is_highlight=False):
    """
    Function to insert an event into the EventsTable
    """
    try:
        if not isinstance(start_time, str) or not isinstance(end_time, str):
            raise ValueError(
                "start_time and end_time must be strings in 'HH:MM' format."
            )
        response = table.put_item(
            Item={
                "event_date": event_date,
                "event_name": event_name,
                "start_time": start_time,
                "end_time": end_time,
                "isHighlight": is_highlight,
            }
        )
        return {"message": "Event inserted successfully", "status": "success"}

    except ClientError as e:
        print(f"Error inserting event into DynamoDB: {e}")
        return {"error": "Failed to insert event", "status": "failed"}
    except ValueError as ve:
        print(f"Error: {ve}")
        return {"error": str(ve), "status": "failed"}


def delete_event(event_date, event_name):
    """
    Deletes events in the db 
    """
    try:
        response = table.delete_item(
            Key={"event_date": event_date, "event_name": event_name}
        )
        if response.get("ResponseMetadata", {}).get("HTTPStatusCode") == 200:
            return {"message": "Event deleted successfully", "status": "success"}
        else:
            return {"error": "Failed to delete event", "status": "failed"}

    except ClientError as e:
        print(f"Error deleting event: {e}")
        return {"error": "Failed to delete event", "status": "failed"}


def update_event(event_date, event_name, start_time, end_time, is_highlight=None):
    """
    Updates events in the db based on event date
    """
    try:
        if not isinstance(start_time, str) or not isinstance(end_time, str):
            raise ValueError(
                "start_time and end_time must be strings in 'HH:MM' format."
            )
        update_expression = "SET start_time = :start_time, end_time = :end_time"
        expression_attribute_values = {":start_time": start_time, ":end_time": end_time}
        if is_highlight is not None:
            update_expression += ", isHighlight = :is_highlight"
            expression_attribute_values[":is_highlight"] = is_highlight
        response = table.update_item(
            Key={"event_date": event_date, "event_name": event_name},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW",
        )
        return {"message": "Event updated successfully", "status": "success"}

    except ClientError as e:
        print(f"Error updating event: {e}")
        return {"error": "Failed to update event", "status": "failed"}


def get_all_events():
    """
    Gets all events in the db in descending order
    """
    try:
        response = table.scan()
        if "Items" in response and response["Items"]:
            events = [
                {
                    "event_date": item["event_date"],
                    "event_name": item["event_name"],
                    "start_time": item["start_time"],
                    "end_time": item["end_time"],
                    "isHighlight": item.get("isHighlight", False),
                }
                for item in response["Items"]
            ]
            events.sort(key=lambda x: x["event_date"], reverse=True)
            return events
        else:
            return []
    except ClientError as e:
        print(f"Error scanning events: {e}")


def get_events_for_date(event_date):
    """
    Fetch events for a specific date.
    """
    try:
        response = table.query(
            KeyConditionExpression="event_date = :event_date",
            ExpressionAttributeValues={":event_date": event_date},
        )
        if "Items" in response and response["Items"]:
            events = [
                {
                    "event_name": item["event_name"],
                    "start_time": item["start_time"],
                    "end_time": item["end_time"],
                    "isHighlight": item.get("isHighlight", False),
                }
                for item in response["Items"]
            ]
            return events
        else:
            return []

    except ClientError as e:
        print(f"Error querying events for date {event_date}: {e}")
        return []


def get_upcoming_events(limit=6):
    try:
        current_date_str = get_current_date()
        response = table.scan(
            FilterExpression="event_date >= :current_date",
            ExpressionAttributeValues={":current_date": current_date_str},
        )
        if "Items" in response and response["Items"]:
            sorted_events = sorted(
                response["Items"],
                key=lambda x: (x["event_date"], x["start_time"]),
            )[:limit]
            return sorted_events
        else:
            return []

    except ClientError as e:
        print(f"Error querying events: {e}")
        return []
