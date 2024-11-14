import os
from dotenv import load_dotenv
import boto3
from botocore.exceptions import ClientError

# Load environment variables from .env file
load_dotenv()


class Config:
    # Fetch the values from environment variables
    SUPERUSER_USERNAME = os.getenv("SUPERUSER_USERNAME")
    SUPERUSER_PASSWORD = os.getenv("SUPERUSER_PASSWORD")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    AWS_REGION = os.getenv("AWS_REGION")
    pinecone = os.getenv("pinecone")
    openapi = os.getenv("openapi")
    pinecone_index_name = "ai-health-thrapy"

    @staticmethod
    def init_meal_table():
        """Initialize and return the DynamoDB table object for meals."""
        dynamodb = boto3.resource("dynamodb", region_name=Config.AWS_REGION)
        try:
            return dynamodb.Table("MealsTable")
        except ClientError as e:
            print(f"Error initializing DynamoDB table: {e}")
            raise e

    @staticmethod
    def init_event_table():
        """Initialize and return the DynamoDB table object for events."""
        dynamodb = boto3.resource("dynamodb", region_name=Config.AWS_REGION)
        try:
            return dynamodb.Table("EventsTable")
        except ClientError as e:
            print(f"Error initializing DynamoDB table: {e}")
            raise e

    @staticmethod
    def init_user_table():
        """Initialize and return the DynamoDB table object for users."""
        dynamodb = boto3.resource("dynamodb", region_name=Config.AWS_REGION)
        try:
            return dynamodb.Table("UsersTable")
        except ClientError as e:
            print(f"Error initializing UsersTable: {e}")
            raise e

    @staticmethod
    def init_contacts_table():
        """Initialize and return the DynamoDB table object for users."""
        dynamodb = boto3.resource("dynamodb", region_name=Config.AWS_REGION)
        try:
            return dynamodb.Table("Contacts")
        except ClientError as e:
            print(f"Error initializing UsersTable: {e}")
            raise e
