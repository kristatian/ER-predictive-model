# Extra imports required for running the model itself
- Tensorflow 2.11.0
- Pandas 1.5.3
- Joblib 1.2.0
- Numpy 1.24.1

**MODEL DOESN'T WORK UNLESS YOU DOWNLOAD THE ZIP FROM GOOGLE DRIVE AND REPLACE THE SAVED_MODELS FOLDER**



# Database Set-Up

Software Versions:
- Python 3.8.2
- Flask 2.2.2
- Flask-Login 0.6.2
- Requests 2.28.2
- For the MySQL Server and Connector select the default one


## MySQL Server Set-up
To run the database you'll first need to set-up the server locally:

Step 1: Download and run the mysql server installer from https://dev.mysql.com/downloads/installer/ (An account is needed)
MySQL Server installation Notes **READ**
- Leave everything as default including the port and protocol
- **Highly advised to choose simple server credentials (username, password) as this is purely for development**
- **Creating a user to access the server is necessaary, again simple credentials are recommended**
- Selecting to run the server as a Windows Service makes the development process much easier but is not necessary

Step 2: Download the mysql python connector from https://dev.mysql.com/downloads/connector/python/, this will 
allow you to directly connect your python file to the database

Step 3: Open a terminal and navigate to the bin directory where the server executable file is stored, a typical path is "C:\Program Files\MySQL\MySQL Server 8.0\bin" and run **mysql -u {username} -p** which will then prompt you to enter your password where {username} is your username (no brackets). *Note: For some reason entering the password on the same line does not work as intended so I would recommend it this way

Step 4: Once your credentials have been verified run "SOURCE {PATH_TO_DATABASE SCRIPT}" (no brackets), this will load the database script and create the database. Congrats you have now set-up the database!

Step 5 (Optional): To connect and view the database on the server download and install DBeaver from https://dbeaver.io/. Once installed, run the program and click on "Database" at the top of the program and "New Database Connection". Select MySQL as your database type and input the Port, Database name, and credentials. Clicking "Test Connection" will verify if you have access. Once successful the database will appear in the list of databases on the left.

