import boto3
from botocore.exceptions import ClientError
from datetime import datetime
from config import Config

table = Config.init_event_table()

# Function to insert an event into the EventsTable
def insert_event(event_date, event_name, start_time, end_time):
    try:
        if not isinstance(start_time, str) or not isinstance(end_time, str):
            raise ValueError("start_time and end_time must be strings in 'HH:MM' format.")
        
        # Insert event into DynamoDB table
        response = table.put_item(
            Item={
                "event_date": event_date,  # Partition Key
                "event_name": event_name,  # Sort Key
                "start_time": start_time,  # Time format 'HH:MM'
                "end_time": end_time       # Time format 'HH:MM'
            }
        )
        print("Insert successful:", response)
        return {"message": "Event inserted successfully", "status": "success"}

    except ClientError as e:
        print(f"Error inserting event into DynamoDB: {e}")
        return {"error": "Failed to insert event", "status": "failed"}
    except ValueError as ve:
        print(f"Error: {ve}")
        return {"error": str(ve), "status": "failed"}

# Function to delete an event from the EventsTable
def delete_event(event_date, event_name):
    try:
        response = table.delete_item(
            Key={
                'event_date': event_date,
                'event_name': event_name
            }
        )
        if response.get("ResponseMetadata", {}).get("HTTPStatusCode") == 200:
            return {"message": "Event deleted successfully", "status": "success"}
        else:
            return {"error": "Failed to delete event", "status": "failed"}

    except ClientError as e:
        print(f"Error deleting event: {e}")
        return {"error": "Failed to delete event", "status": "failed"}

# Function to update an event's times (start_time, end_time)
def update_event(event_date, event_name, start_time, end_time):
    try:
        # Check if start_time and end_time are valid
        if not isinstance(start_time, str) or not isinstance(end_time, str):
            raise ValueError("start_time and end_time must be strings in 'HH:MM' format.")
        
        # Update event times in the table
        response = table.update_item(
            Key={
                'event_date': event_date,
                'event_name': event_name
            },
            UpdateExpression="SET start_time = :start_time, end_time = :end_time",
            ExpressionAttributeValues={
                ':start_time': start_time,
                ':end_time': end_time
            },
            ReturnValues="UPDATED_NEW"
        )
        print("Update successful:", response)
        return {"message": "Event updated successfully", "status": "success"}

    except ClientError as e:
        print(f"Error updating event: {e}")
        return {"error": "Failed to update event", "status": "failed"}
    except ValueError as ve:
        print(f"Error: {ve}")
        return {"error": str(ve), "status": "failed"}

# Function to get events for a specific date
def get_events_for_date(event_date):
    try:
        response = table.query(
            KeyConditionExpression="event_date = :event_date",
            ExpressionAttributeValues={':event_date': event_date}
        )
        if 'Items' in response and response['Items']:
            events = [{"event_name": item['event_name'], "start_time": item['start_time'], "end_time": item['end_time']} for item in response['Items']]
            return events
        else:
            return []

    except ClientError as e:
        print(f"Error querying events: {e}")
        return []
