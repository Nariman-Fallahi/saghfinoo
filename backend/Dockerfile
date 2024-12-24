FROM python:3.13-alpine

WORKDIR /app

copy . .

run pip install -r requirements.txt 

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
