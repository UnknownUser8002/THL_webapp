from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import re
import logging
from datetime import datetime
from flask_cors import CORS
import send_email as se

# Initialize Flask App and API
app = Flask(__name__)
api = Api(app)
CORS(app)

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Data validation helper functions
def validate_ipv4(ipv4):
    # Simple regex to validate IPv4 format
    pattern = r"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
    return bool(re.match(pattern, ipv4))

def validate_email(email):
    # Simple regex to validate email format
    pattern = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    return bool(re.match(pattern, email))

def json_to_readable(data):
    # Makes JSON strings more readable to humans
    readable_string = "MESSAGE:\n\n\n"
    readable_string = ',\n'.join(f"*{k}* = *{v}*" for k, v in data.items())
    readable_string += "\n:END_MESSAGE"
    return readable_string


# Main API Endpoint to handle freight requests
class FreightRequest(Resource):
    def post(self):
        data = request.get_json()
        readable_data = json_to_readable(data)


        # Check if all required fields are present
        required_fields = [
            "USER_ipv4", "USER_language_preference", "USER_first_name", "USER_last_name",
            "USER_email", "USER_company_name", "USER_company_vat", "USER_company_fiscal_code",
            "FROM_country", "FROM_address", "FROM_postalcode", "TO_country",
            "TO_address", "TO_postalcode", "TRANSPORT_method", "TRANSPORT_particular_method",
            "USER_sendtime"
        ]

        # Validate required fields
        for field in required_fields:
            if field not in data:
                return {"error": f"Field '{field}' is required"}, 400

        # Security checks
        if not validate_ipv4(data["USER_ipv4"]):
            return {"error": "Invalid IPv4 address"}, 400
        if not validate_email(data["USER_email"]):
            return {"error": "Invalid email format"}, 400


        subject = "RICHIESTA QUOTAZIONE da App THL - MailGun"
        transport_method = data["TRANSPORT_method"]
        if transport_method == "LAND":
            se.send_single_email("Massimiliano Lami <m.lami@thlinternational.com>", subject, str(readable_data))
            se.send_single_email("Alessandro Ardizio <operativo@thlinternational.com>", subject, str(readable_data))
            se.send_single_email("LAND <no.reply.thl@outlook.com>", subject, str(readable_data))
        elif transport_method == "SHIP" or transport_method == "PLANE":
            se.send_single_email("Stefano Caporali <s.caporali@thlinternational.com>", subject, str(readable_data))
            se.send_single_email("SHIP OR PLANE <no.reply.thl@outlook.com>", subject, str(readable_data))
        elif transport_method == "LOGISTICS":
            se.send_single_email("Massimiliano Lami <m.lami@thlinternational.com>", subject, str(readable_data))
            se.send_single_email("LOGISTICS <no.reply.thl@outlook.com>", subject, str(readable_data))
        else:
            return {"error": "Invalid Transport Method"}, 400




        # Business Logic or Processing (can be extended as needed)
        response_data = {
            "status": "success",
            "message": "Freight request successfully received."
        }

        logger.info(f"Freight request received: {data['USER_email']} at {datetime.now()}\nDATA: {data}")

        return jsonify(response_data)

# Add API Resource to Flask API
api.add_resource(FreightRequest, '/api/freight-request')

# Run Flask app (Make sure this works on PythonAnywhere's server)
if __name__ == '__main__':
    app.run(debug=False)
