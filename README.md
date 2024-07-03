controllers/: Contains controller functions that handle incoming requests, 
process data, and send responses.
//The controller function receives the request, processes data, interacts with models (if necessary),
and sends a response back.//



models/: Defines the data structures and interactions with databases 
or other data sources.Models interact with databases or other data sources to retrieve, store, or update data as needed.

routes/: Defines the API endpoints and their corresponding controller functions.
The router determines which controller function should handle the request based on the URL and HTTP method.


//app.js
The execution starts from the main file (e.g., app.js). 
It initializes the application, sets up dependencies, and starts the server.

