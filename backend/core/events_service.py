import boto3
from botocore.exceptions import ClientError
from config import Config

# Initialize DynamoDB table
table = Config.init_event_table()

# Function to insert an event into the EventsTable
def insert_event(event_date, event_name, start_time, end_time, is_highlight=False):
    try:
        if not isinstance(start_time, str) or not isinstance(end_time, str):
            raise ValueError("start_time and end_time must be strings in 'HH:MM' format.")
        
        # Insert event into DynamoDB table
        response = table.put_item(
            Item={
                "event_date": event_date,  # Partition Key
                "event_name": event_name,  # Sort Key
                "start_time": start_time,  # Time format 'HH:MM'
                "end_time": end_time,      # Time format 'HH:MM'
                "isHighlight": is_highlight # New isHighlight field
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

# Function to update an event's times (start_time, end_time) and highlight status
def update_event(event_date, event_name, start_time, end_time, is_highlight=None):
    try:
        # Check if start_time and end_time are valid
        if not isinstance(start_time, str) or not isinstance(end_time, str):
            raise ValueError("start_time and end_time must be strings in 'HH:MM' format.")
        
        # Prepare update expression and values
        update_expression = "SET start_time = :start_time, end_time = :end_time"
        expression_attribute_values = {
            ':start_time': start_time,
            ':end_time': end_time
        }

        if is_highlight is not None:
            update_expression += ", isHighlight = :is_highlight"
            expression_attribute_values[':is_highlight'] = is_highlight

        # Update event times and isHighlight field
        response = table.update_item(
            Key={
                'event_date': event_date,
                'event_name': event_name
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
        )
        print("Update successful:", response)
        return {"message": "Event updated successfully", "status": "success"}

    except ClientError as e:
        print(f"Error updating event: {e}")
        return {"error": "Failed to update event", "status": "failed"}

def get_all_events():
    try:
        response = table.scan()
        if 'Items' in response and response['Items']:
            events = [{"event_date": item['event_date'], 
                       "event_name": item['event_name'], 
                       "start_time": item['start_time'], 
                       "end_time": item['end_time'],
                       "isHighlight": item.get('isHighlight', False)}  # Default to False if not set
                      for item in response['Items']]
            events.sort(key=lambda x: x['event_date'])
            return events
        else:
            return []
    except ClientError as e:
        print(f"Error scanning events: {e}")

def get_events_for_date(event_date):
    """Fetch events for a specific date."""
    try:
        # Query the DynamoDB table using the event_date as the partition key
        response = table.query(
            KeyConditionExpression="event_date = :event_date",  # partition key is event_date
            ExpressionAttributeValues={":event_date": event_date}
        )

        # Check if the response contains any items
        if 'Items' in response and response['Items']:
            # Format the events to include event name, start time, end time, and isHighlight
            events = [
                {
                    "event_name": item['event_name'],
                    "start_time": item['start_time'],
                    "end_time": item['end_time'],
                    "isHighlight": item.get('isHighlight', False)  # Default to False if not provided
                }
                for item in response['Items']
            ]
            return events
        else:
            # If no events are found for the specified date
            return []
    
    except ClientError as e:
        print(f"Error querying events for date {event_date}: {e}")
        return []
