from flask import Flask
from flask_cors import CORS
from database.connection import connect
from routes.transactions import transactions_bp
from routes.saving_goals import saving_goals_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(
    transactions_bp
)

app.register_blueprint(
saving_goals_bp
)

@app.route("/")
def home():
    return "Hi Simon, I love you!"

@app.route("/test-db")
def test_db():

    conn = connect()

    cur = conn.cursor()

    cur.execute("SELECT current_database();")

    result = cur.fetchone()

    cur.close()
    conn.close()

    return f"Connected to: {result[0]}"


