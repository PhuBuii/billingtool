import json
from flask import Flask, render_template, Blueprint

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('project_view.html')

if __name__ == '__main__':
    app.run()