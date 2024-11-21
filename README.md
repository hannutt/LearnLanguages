Project keywords: ReactJS, Node.js, MySQL, AI-integration, Axios, ExpressJS, LibreTranslate API

SPECIFICATIONS

The frontend is made with ReactJS and the backend with Node.JS. Artificial intelligence is implemented using Chat GPT 3.5 API. The application uses MySQL as a database and HTTP requests are implemented using the Axios library. Communication between the application and the GPT API is implemented using JavaScript's Fetch method.

MAIN FEATURES

This is the first version, so for now the features are limited. The idea of ​​the application is to present the user with questions related to learning Finnish or Swedish, retrieved from the SQL database. The answers given by the user are checked with the Chat GPT API.

The questions are of the form "how do you say good day in Finnish? etc." The user writes his answer in the html input field of the question in the language asked in the question, after which the JavaScript function sends the question to the Chat GPT API.
Finally, the response given by the user is compared with the response given by the API

The user selects the desired language from the html selection component. the selected language is saved with the onChange event handler in the State variable, which is passed as a query parameter to the node.js backend. With the help of the parameter, the backend knows how to choose the right SQL table.

TRANSLATION OF THE QUESTION INTO THE DESIRED LANGUAGE

The questions are presented in English by default. However, the user can translate the questions by choosing the language they want from the available options. Once the language is selected, an English question is sent to the LibreTranslate API using JavaScript's fetch method. as a response, the API returns the translated question and it is displayed in the HTML frontend.

LISTENING THE QUESTION

The user can also listen to the question asked. The question is converted from text to speech using the JavaScript Web Speech API. The operation of the Web Speech API is implemented by a simple function that is executed when the user clicks a button.
