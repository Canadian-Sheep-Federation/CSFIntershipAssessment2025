# Description
I chose to create a form that asks the user to enter their favorites from Pokemon, including their favorite region, favorite pokemon, and their favorite pokemon type. Along with entering their desired username, the user submits this information to my API.

The public API I implemented is called the [PokéAPI](https://pokeapi.co/). I used their API to return a list of all 1025 pokemon, which formatted into a searchable list for the user to select their favorite pokemon.

I created 4 endpoints:
- The POST endpoint `'/submit'` takes the submitted data and adds it as an entry into an SQLite database, and returns the userid, which is printed out with the confirmation message.
- The GET endpoint `'/getentry/:userid'` returns and prints the row with the corresponding `userid` in the results, and returns a null value if there are no entries that match
- The GET endpoint `'/getallentries'` returns every response to the form that is recorded in the database
- the DELETE endpoint `'clear'` deletes all the data from the database, in case you want to start over or the screen is becoming cluttered.

# How to Run
### Installation
After cloning the repository, open the terminal in the webapp folder. Then, run `npm install` to install the front end dependencies, and `npm start` to run the webapp, opening on localhost:3000.

Next open the terminal in the api folder. Run `npm install` to install the back end dependencies, and `node ./server.js` to run the server, opening on localhost:4000.

### Testing
To take the survey, click the `Take Survey` button, enter your username and fill in the fields with your favorite region, pokemon, and pokemon type from the Pokemon games. Click submit to have your response recorded or updated.

To view the responses, click the `See Results` button. Type in a username and press `GO!` to see the response for that user. If you don't enter a username before pressing `GO!`, it will print out all the responses. Pressing `Clear Database` will delete all the data in the database if the list is becoming too long.