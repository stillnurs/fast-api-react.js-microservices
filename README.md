# Simple microservices implementation using Python FastApi and React.Js

This project is build mainly for learning purposes.

### Getting started with project

After cloning the project
Set up the front-end part (everything descripted in followed Readme file)

### Run the Back-end

1. Install requeirements
2. Go to "inventory" folder and run command `uvicorn main:app --reload `
3. Run the "consumer.py" script file
4. Go to "payment" folder and run command `uvicorn main:app --reload --port 8001` (since first app is already running in port 8000 by deafult)
5. Run the "consumer.py" script file

### Postman or UI

You can test back-end apps by using a Postman or other equivalent tools
Or you can use UI written in ReactJs to test it in [http://localhost:3000](http://localhost:3000)
