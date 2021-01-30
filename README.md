# mail-sender-with-redis

#### Technologies

- [Es6+ Javascript](https://www.ecma-international.org/ecma-262/9.0/index.html)
- [Node/Express](https://nodejs.org/en/)
- [NPM](npmjs.com)
- [PostgreSQL](https://www.postgresql.org/)

### Testing

- Open post man app
- enter the home or base url https://mvmailsender.herokuapp.com/
- select a post http method to create a user https://mvmailsender.herokuapp.com/v1/auth/register
- with this {
  "email":"usermail@example.com",
  "username":"Usernamehere",
  "password":"Userpasswordhere"
  }
- select a http method to login a user https://mvmailsender.herokuapp.com/v1/auth/login/
  -with this request body {"email":"efejustin3@gmail.com",
  "password":"thejust"}
- select a patch http method to subscribe a user https://mvmailsender.herokuapp.com/v1/auth/subscribe/?email=usermail@example.com
- select a patch http method to unsubscribe a user https://mvmailsender.herokuapp.com/v1/auth/subscribe/?email=usermail@example.com

- select a post http method to start sending newsletter every second week Tuesday https://mvmailsender.herokuapp.com/v1/auth/send

- select a post http method to stop sending newsletter every second week Tuesday https://mvmailsender.herokuapp.com/v1/auth/stop

# Clone the app

git clone https://github.com/justinefe/mail-sender-with-redis.git

# Required .env credentials

- PORT=3000
- NODE_ENV=development
- DEV_DATABASE_URL=
- REDIS_URL='redis://127.0.0.1:6379'
- USER_MAIL= user gmail
- USER_PASSWORD= user password
- DATABASE_URL= postgress DB URL
- BASE_URL= e.g localhost:3000 or https://mvmailsender.herokuapp.com/
- SECRETKEY=

# Switch to directory

cd < cloned directory >
npm install

# Run migrations

npm run migration

# Start the application

npm run dev

# View the application

navigate to localhost:3000 to view the application

### Contributor

- [Efeoghene Justin](https://github.com/justinefe)
