# mail-sender-with-redis

#### Technologies

- [Es6+ Javascript](https://www.ecma-international.org/ecma-262/9.0/index.html)
- [Node/Express](https://nodejs.org/en/)
- [NPM](npmjs.com)
- [PostgreSQL](https://www.postgresql.org/)

### Testing

- Open post man app
- enter the home or base url https://pm-global.herokuapp.com/
- select a get http method to view a user https://pm-global.herokuapp.com//api/v1/users/:id
- select a post http method to create a user https://pm-global.herokuapp.com//api/v1/users
- select a put http method to update a user https://pm-global.herokuapp.com//api/v1/users/:id
- select a delete http method to delete a user https://pm-global.herokuapp.com//api/v1/users/:id
- select a get http method to view a particular user https://pm-global.herokuapp.com//api/v1/users?filter_field=firstname&filter_value=chibunna
- select a get http method to view all users https://pm-global.herokuapp.com//api/v1/users

# Clone the app

git clone https://github.com/justinefe/mail-sender-with-redis.git

# Required .env credentials

PORT=3000
NODE_ENV=development
DEV_DATABASE_URL=
REDIS_URL='redis://127.0.0.1:6379'
FRONTEND_APP_URL= e.g localhost:3000
NODE_ENV=
USER_MAIL=
USER_PASSWORD=
DATABASE_URL=
BASE_URL=
SECRETKEY=

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
