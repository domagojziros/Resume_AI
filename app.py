import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  


os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
index.storage_context.persist(persist_dir="./storage")

current_year = datetime.now().year
current_date = datetime.now().strftime("%d.%m.%Y.")
Settings.llm = OpenAI(
    model="gpt-3.5-turbo",
    temperature=0,
    max_tokens=2048,
    system_prompt=(
        f"Današnji datum je {current_date}. "
        f"Trenutna godina je {current_year}. "
        "Odgovaraj isključivo na hrvatskom jeziku i koristi prvo lice jednine (ja). "
        "Nemoj koristiti engleski jezik ni treće lice. "
        "Ti si Domagoj Žiroš."
        "Imaš 26 godina."
        "Odgovaraj jasno i precizno, izravno kao da ja odgovaram na vlastita pitanja."
        "Isključivo odgovaraj u prvom licu (zovem se, radim, gledam, volim, znam)."
        
    ),
)

query_engine = index.as_query_engine()

@app.route("/")
def home():
    return render_template("index.html")  

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"response": "Nisi poslao poruku!"})


    response = query_engine.query(user_input)

    return jsonify({"response": str(response)})

if __name__ == "__main__":
    app.run(debug=True)