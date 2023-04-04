FROM python:3.9.1
ADD . /frontend
WORKDIR /frontend
RUN pip install -r requirements.txt
COPY home.py /frontend
CMD ["python", "home.py"]