import requests
import logging

import os
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO) # set log level
load_dotenv() # for reading API key from `.env` file.

# Sandbox API URL format: https://api.mailgun.net/v3/sandbox<ID>.mailgun.org/messages
MAILGUN_API_URL = "https://api.mailgun.net/v3/sandbox0079c4c7468444ac84958031b634d296.mailgun.org/messages"
FROM_EMAIL_ADDRESS = "MAILGUN <postmaster@sandbox0079c4c7468444ac84958031b634d296.mailgun.org>"

def send_single_email(to_address: str, subject: str, message: str):
    try:
        api_key = os.getenv("MAILGUN_API_KEY")  # get API-Key from the `.env` file

        resp = requests.post(MAILGUN_API_URL, auth=("api", api_key),
                             data={"from": FROM_EMAIL_ADDRESS,
                                   "to": to_address, "subject": subject, "text": message})
        if resp.status_code == 200:  # success
            logging.info(f"Successfully sent an email to '{to_address}' via Mailgun API.")
        else:  # error
            logging.error(f"Could not send the email, reason: {resp.text}")

    except Exception as ex:
        logging.exception(f"Mailgun error: {ex}")

if __name__ == "__main__":
    send_single_email("Test <no.reply.thl@outlook.com>", "Single email test", "Testing Mailgun API for a single email")