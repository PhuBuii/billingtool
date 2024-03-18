#!/bin/zsh

DEVELOPMENT_ENV='127.0.0.1'
# Set the name of your Flask application file
FLASK_APP_FILE="./app.py"

export DEBUG="ON"
#export FLASK_RUN_PORT=9002
#export FLASK_RUN_HOST="$DEVELOPMENT_ENV"
export FLASK_APP="$FLASK_APP_FILE"

flask run 