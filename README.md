# chat-app
Real-time chat app for multiple users.

# Development
The chat is made with express and node js for the backend and frontend. MySQL is used for the database. Docker-compose is used for scalability and high availability. 
![Alt text](https://cdn.discordapp.com/attachments/679727210843734047/1097605492509003827/image.png)

The chat consists of two pages:
- login page
![Alt text](https://cdn.discordapp.com/attachments/679727210843734047/1097599053119889418/image.png)
 The user enters their name in the login page, after that they are redirected to the main page, and they are ready to start messaging. 

- main page
![Alt text](https://cdn.discordapp.com/attachments/679727210843734047/1097599418938691666/image.png)
The chat keeps history of the messages and the date and time they are sent. There is also a logout button for changing the username.


# Requirements

- MySQL
- NodeJS
- npm
- Docker
- Docker-compose

# Start
change in server.js
```
const db = mysql.createConnection({
  host: "your ip",
  port: "3306",
  user : "root",
  password : "your password",
  database : "chat"
})
```
with docker-compose:
```
sudo docker-compose up --build --scale chat-app=5
```
without docker-compose:
```
    npm install
    npm start
```
