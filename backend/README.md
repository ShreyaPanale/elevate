# elevate api
A Flask API server running on heroku interacting with firestore.

# ENV config

- Go to https://console.firebase.google.com/u/0/project/elevate-25d94/settings/serviceaccounts/adminsdk
- Click the "Generate new private key" at the bottom of the page.
- Rename the file to `creds.json` and place it in the `backend/` folder.
- Create a `.env` file in the backend folder with the following configuration:
    ```
    CREDS_PATH="./creds.json"
    ```
    or the appropriate filename you prefer.
