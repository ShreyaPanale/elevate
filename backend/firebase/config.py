import os
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate(os.getenv("CREDS_PATH"))
firebase_admin.initialize_app(cred, {
    'storageBucket': 'elevate-25d94.appspot.com'
})
