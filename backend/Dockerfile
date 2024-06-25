FROM python:3.11.4-slim-buster

WORKDIR /app

copy . .

run pip install -r requirements.txt

CMD ['python', 'manage.py', 'runserver', '0.0.0.0:3000']

EXPOSE 3000