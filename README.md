# How to launch the App

1. Open a terminal in the current directory where the application is located.
2. Your device must have the latest LTS version of node.js installed to run the
   code. If node.js is not installed on your device, you can download it for
   free on the official website https://nodejs.org/en.
3. Install dependencies. To do this, run the `"npm install"` command in the
   terminal.
4. Run the command `"npm start"` in the terminal. This will start the server at http://localhost:3000.

# Main application features

1. Based on the external database, the application creates its own user database with the following fields: `name, email, age`;
2. All external data is validated and checked for duplication (using a unique field `"email"`).
3. In case of validation failure or duplication, the server will return a response with the status and description of the error.
4. To add a new user to the database, a telegram bot has been created https://t.me/VM_alpha_bot.
5. The bot collects information about the new user step by step and adds it to the database.
6. In case of entering incorrect data about the user, the bot informs the client about the error and waits for the correct data to be entered.
7. Upon successful addition of a user, the bot notifies the client.
8. The application is deployed on the https://render.com/.

# Author

Vadym Makovii
