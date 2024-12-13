import os
from dotenv import load_dotenv
import requests
from flask import Flask, request
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY",  "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
  raise EnvironmentError("Please create .env.local file and insert there UNSPLASH_KEY")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG

@app.route("/new-image")
def new_image():
  search_value = request.args.get("query")
  headers = {
    "Accept-Version": "v1",
    "Authorization": f"Client-ID {UNSPLASH_KEY}"
  }
  params = {"query": search_value}
  response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
  return response.json()

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5050)
