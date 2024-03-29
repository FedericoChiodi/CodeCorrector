CodeCorrector
=============================

Overview
--------

CodeCorrector is a web application that helps users correct their code by providing concise explanations for the identified bugs. It utilizes the power of the GPT-3.5 Turbo model from OpenAI to assist users in debugging their code.

Tools Used
----------

### Frontend

-   HTML and CSS: The application's user interface is built using HTML for structure and CSS for styling.

-   JavaScript: The frontend functionality is implemented in JavaScript, which handles user interactions and communicates with the server.

### Backend

-   Node.js and Express: The server is built using Node.js and the Express framework, providing a robust and efficient server-side environment.

-   dotenv: The `dotenv` library is used to load environment variables, ensuring the secure handling of sensitive information, such as API keys.

-   OpenAI GPT-3.5 Turbo: The application leverages OpenAI's GPT-3.5 Turbo model to generate responses and explanations for code corrections.

-   Cors: The `cors` middleware is used to enable Cross-Origin Resource Sharing, allowing the frontend to make requests to the server from a different domain.

Features
--------

### User Interface

The frontend provides a simple and user-friendly interface for users to interact with the application. It includes the following elements:

-   Code Input: Users can input their code into a text area.

-   Submit Button: When users submit their code, the application sends a request to the server for correction.

-   Response Area: This area displays the response from the GPT-3.5 Turbo model, including the corrected code and explanations for the identified bugs.

### Server

The backend server is responsible for handling incoming requests from the frontend and interacting with the OpenAI API to generate code corrections. Here are the key features of the server:

-   GET Route: A simple GET route at the root path ("/") is provided to confirm that the server is operational.

-   POST Route: When the user submits code, a POST request is sent to the server. The server extracts the user's code from the request and constructs a message conversation for the GPT-3.5 Turbo model. It then sends a request to the OpenAI API, including the user's code as part of the conversation. The response from the model is returned to the frontend.

-   Error Handling: The server includes error handling to ensure that any issues with the API request or server-side errors are properly managed. Error messages are sent to the frontend for user feedback.

-   Port Configuration: The server listens on port 5000 by default and provides a console message upon successful startup.

Getting Started
---------------

To run the CodeCorrector web application locally, follow these steps:

1.  Clone the GitHub repository to your local machine.

2.  Install the required Node.js dependencies by running the following command in the project directory:

    bashCopy code

    `npm install`

3.  Create a `.env` file in the server directory and add your OpenAI API key as follows:

    envCopy code

    `OPENAI_API_KEY=your-api-key-here`

4.  Start the server by running the following command:

    bashCopy code

    `node server.js`

5.  Open a web browser and access the application at `http://localhost:5000`.

6.  Input your code in the provided text area and click the "Submit" button to receive code corrections and explanations.

Note
----

Please ensure you have obtained an API key from OpenAI and replace `"your-api-key-here"` with your actual API key in the `.env` file.


Acknowledgments
---------------

-   This application was developed as part of a learning project and utilizes the OpenAI GPT-3.5 Turbo model for code correction.

-   Special thanks to the developers of Express, OpenAI, and other libraries used in this project for their valuable contributions.