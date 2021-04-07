import os
import firebase_admin
from firebase_admin import credentials
import json

service_account = json.loads(os.getenv("GOOGLE_CREDS")) if os.getenv("APP_ENV") == "PRODUCTION" else os.getenv("CREDS_PATH")
cred = credentials.Certificate(service_account)

firebase_admin.initialize_app(cred, {
    'storageBucket': 'elevate-25d94.appspot.com'
})
