FROM python:3.9.1
ADD . /backend
WORKDIR /backend
RUN pip install -r requirements.txt
COPY main.py /backend
CMD ["python", "main.py"]