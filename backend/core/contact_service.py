import boto3
from botocore.exceptions import ClientError
from datetime import datetime
from config import Config

table = Config.init_contacts_table()


def add_new_contact(date, name, phone, email):
    """
    Add a new contact to DynamoDB. The `date` is the partition key.
    """
    try:
        response = table.put_item(
            Item={
                'date': date,
                'name': name,
                'phone': phone,
                'email': email
            }
        )
        return {'message': 'Contact added successfully', 'response': response}
    except ClientError as e:
        return {'error': str(e)}


def get_all_contacts():
    """
    Get all contacts from DynamoDB.
    """
    try:
        response = table.scan()
        contacts = response.get('Items', [])
        if contacts:
            contacts.sort(key=lambda x: x['date'], reverse=True)
        return {'contacts': contacts}

    except ClientError as e:
        return {'error': str(e)}


def delete_existing_contact(date, name):
    """
    Delete a contact from DynamoDB based on the provided date and name.
    """
    try:
        response = table.get_item(
            Key={
                'date': date,
                'name': name
            }
        )
        if 'Item' not in response:
            return {'error': f'Contact with name {name} on {date} not found.'}
        delete_response = table.delete_item(
            Key={
                'date': date,
                'name': name
            }
        )
        return {'message': f'Contact {name} on {date} deleted successfully'}
    except Exception as e:
        return {'error': f'An error occurred: {str(e)}'}
