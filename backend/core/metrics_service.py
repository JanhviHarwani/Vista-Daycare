import boto3
from datetime import datetime, timedelta
import uuid
from config import Config

table = Config.init_metric_table()


def log_visit(page_name):
    """
    Log a visit to the DynamoDB table.
    """

    if not page_name:
        raise ValueError("Page name is required")
    visit_id = str(uuid.uuid4())
    visit_data = {
        "VisitID": visit_id,
        "PageName": page_name,
        "VisitTime": datetime.utcnow().isoformat(),
    }
    try:
        table.put_item(Item=visit_data)
        return visit_id, "Visit data logged successfully"
    except Exception as e:
        raise RuntimeError(f"Error logging visit: {str(e)}")


def get_visits_for_day(target_date):
    """
    Fetch all visits for a given date from DynamoDB.
    """
    try:
        target_date_obj = datetime.strptime(target_date, "%Y-%m-%d")
        start_of_day = target_date_obj.replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        end_of_day = target_date_obj.replace(
            hour=23, minute=59, second=59, microsecond=999999
        )
        start_iso = start_of_day.isoformat()
        end_iso = end_of_day.isoformat()
        response = table.scan(
            FilterExpression="VisitTime BETWEEN :start_time AND :end_time",
            ExpressionAttributeValues={":start_time": start_iso, ":end_time": end_iso},
        )
        visits = response.get("Items", [])
        return visits
    except Exception as e:
        raise RuntimeError(f"Error fetching visits for day {target_date}: {str(e)}")
