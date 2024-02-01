# Waymakers Customer Form

This is a react client app with an extremely minimal PHP back end. PHP is in server directory and react app in the client directory.


## Development
To get started run npm install at root, then again in the client directory.

Next, copy the server/config/settings.php.template file to server/config/settings.php and modify the vars in there accordingly.

Run the react app for client side hot reloading. Cd into client directory and run `npm start`. The client app should start at http://localhost:3000. It will make xml http requests to the server.

In another terminal cd into server dir and run `docker-compose up`. The server should start at http://localhost:9000. The client uses it just to make API calls.

It's convenient to run them both in dev at the same time so that you can make server changes that hot reload and same for client. The server just acts more or less as API gateway for the client.

## Production
First do an `npm run build` in the client directory, then commit all the changed files (especially those in the `client/build` directory), and push to `origin/main`. Then, ssh into server and do a git pull.