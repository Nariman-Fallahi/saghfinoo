FROM python:3.13-alpine

WORKDIR /app

copy . .

run pip install -r requirements.txt 

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000