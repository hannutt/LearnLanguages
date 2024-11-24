Project keywords: ReactJS, Node.js, MySQL, AI-integration, Axios, ExpressJS, LibreTranslate API

SPECIFICATIONS

The frontend is made with ReactJS and the backend with Node.JS. Artificial intelligence is implemented using Chat GPT 3.5 API. The application uses MySQL as a database and HTTP requests are implemented using the Axios library. Communication between the application and the GPT API is implemented using JavaScript's Fetch method.

MAIN FEATURES

This is the first version, so for now the features are limited. The idea of ​​the application is to present the user with questions related to learning Finnish or Swedish, retrieved from the SQL database. The answers given by the user are checked with the Chat GPT API.

The questions are of the form "how do you say good day in Finnish? etc." The user writes his answer in the html input field of the question in the language asked in the question, after which the JavaScript function sends the question to the Chat GPT API.

Finally, the response given by the user is compared with the response given by the API
The user selects the desired language from the html selection component. the selected language is saved with the onChange event handler in the State variable, which is passed as a query parameter to the Node.js backend. With the help of the parameter, the backend knows how to choose the right SQL table.

TRANSLATION OF THE QUESTION INTO THE DESIRED LANGUAGE

The questions are presented in English by default. However, the user can translate the questions by choosing the language they want from the available options. Once the language is selected, an English question is sent to the LibreTranslate API using JavaScript's fetch method. as a response, the API returns the translated question and it is displayed in the HTML frontend.

LISTENING THE QUESTION

The user can also listen to the question asked. The question is converted from text to speech using
the JavaScript Web Speech API. The operation of the Web Speech API is implemented by a simple function
that is executed when the user clicks a button.

The text-to-speech feature of this app can also repeat a translated question. For example, the program repeats a question translated into Spanish in Spanish, etc. This is done with a simple variable. When the user selects a language from the html selection component, the onChange event handler sends the language code of the selected language to the function that implements the speaking. The language "value" attribute of each Select component is the language code for that language, which is passed to the function when the user selects the language.

DATA VISUALIZATION

The application stores the incorrect and correct answers in two state variables. The user can choose whether he wants to see the results in text or visually. The visualization is done with Google charts and the right and wrong answers are shown in a Cauge chart or a pie chart depending on the user's choice.

The user makes a selection by clicking on a checkbox, both checkboxes have their own value property, the value of one property is "Gauge" and the value of the other is "PieChart". 

After selecting the checkbox, the value of the "value" property is sent using the onChange event handler to a function that displays the Google Chart component and gives the value of the selected checkbox to the chartType property of the Chart component.

SAVE & CONTINUE LATER

This feature will save the ID number of the current question in localStorage if the user clicks the Save and Continue button. The idea is that the user can later continue studying the same question and does not have to start from the beginning.

ASKING A TIP

The user can request a hint about the correct answer by clicking the "Ask hint" button. With each press, one letter of the correct answer is retrieved from the SQL database and the letters are displayed in the html input field. This feature uses a state variable to track the number of clicks and the displayed letter

AUXILIARY IMAGES

In connection with each phrase asked, an auxiliary image is also shown that describes the word/sentence in question. The application uses images from Openclipart.org and the url addresses of the images are stored in the database used by the application. When each question is displayed, the url address of the image is also retrieved from the database, the address is used in the src property of the img element, so that the image itself is displayed.