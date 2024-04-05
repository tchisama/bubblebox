



from flask import Flask,request,jsonify
from flask_cors import CORS
from main import ask_openai


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    print("hello world")
    return "hello world"


@app.route('/answer',methods=["POST"])
def answer():
    data = request.json
    print(data)
    prompt = data["prompt"]
    answer = ask_openai(prompt)
    print(answer)
    return jsonify({"answer":answer})


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)
