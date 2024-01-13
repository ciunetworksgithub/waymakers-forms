# Waymakers Customer Form

This is a node express and react app. It has an express server in the server directory and a react app in the client directory.


## Development
To get started run npm install at root, then again in the client directory.

Next, copy the .env.template file to .env and modify the vars in their accordingly.

Run the react app for client side hot reloading. Cd into client directory and run `npm start`. The client app should start at http://localhost:3000. It will make xml http requests to the server.

Now, run the server in dev mode. Cd back to root and run `docker-compose up`. The server should start at http://localhost:9000. The client uses it just to make API calls. It's a very basic, thin PHP application.

It's convenient to run them both in dev at the same time so that you can make server changes that hot reload and same for client. The server just acts more or less as API gateway for the client.

## Production
First do an `npm run build` in the client directory, then start the server with `npm start` in the root. The application should be served from the server at the `/` index route.