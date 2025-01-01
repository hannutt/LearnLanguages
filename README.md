Project keywords: ReactJS, Node.js, MySQL, AI-integration, Axios, ExpressJS, LibreTranslate API

SPECIFICATIONS

The frontend is made with ReactJS and the backend with Node.JS. Artificial intelligence is implemented using Chat GPT 3.5 API. The application uses MySQL as a database and HTTP requests are implemented using the Axios library. Communication between the application and the GPT API is implemented using JavaScript's Fetch method.

MAIN FEATURES

The idea of ​​the application is to present the user with questions related to learning Finnish or Swedish, retrieved from the SQL database. The user selects the desired language from the html selection component. the selected language is saved with the onChange event handler in the State variable, which is passed as a query parameter to the Node.js backend. With the help of the parameter, the backend knows how to choose the right SQL table.

The questions are of the form "how do you say good day in Finnish? etc." The user writes his answer in the html input field of the question in the language asked in the question, after which the JavaScript function sends the question to the Chat GPT API.

Finally, the response given by the user is compared with the response given by the Chat GPT API.

Example picture where the user has selected the Swedish language from the Select component and the first question retrieved from the SQL database is displayed.

![alt text](frontend/src/images/LLswe.png)


ANSWERING A QUESTION BY SPEAKING

The user can also use the computer's microphone to answer questions. start using the microphone by clicking on the microphone icon. After clicking, a JavaScript function is executed that uses the SpeechRecognition library for speech recognition. Once the user's speech is recognized, it is converted to text and the text is added to the HTML input field. The microphone closes automatically with the onspeechend method.

TRANSLATION OF THE QUESTION INTO THE DESIRED LANGUAGE

The questions are presented in English by default. However, the user can translate the questions by choosing the language they want from the available options. Once the language is selected, an English question is sent to the LibreTranslate API using JavaScript's fetch method. as a response, the API returns the translated question and it is displayed in the HTML frontend.

Example image where the user has translated the given question from English to German using the LibreTranslate API

![alt text](frontend/src/images/LLapp.png)


LISTENING THE QUESTION

The user can also listen to the question asked. The question is converted from text to speech using
the JavaScript Web Speech API. The operation of the Web Speech API is implemented by a simple function
that is executed when the user clicks a button.

The text-to-speech feature of this app can also repeat a translated question. For example, the program repeats a question translated into Spanish in Spanish, etc. This is done with a simple variable. When the user selects a language from the html selection component, the onChange event handler sends the language code of the selected language to the function that implements the speaking. The language "value" attribute of each Select component is the language code for that language, which is passed to the function when the user selects the language.

LISTEN TO THE ENGLISH SENTENCES AND WRITE THE ANSWER IN FINNISH

The program uses mp3 files with short sentences suitable for language learning. 
The user first listens to the sentence and writes the answer in the input field. the response of the input field is stored in a state variable and given as a parameter to the JS fetch method that communicates with the GPT API. The GPT-API checks the user's answer and if the answer is correct, the user can listen to a new sentence.

The user can adjust the audio speed of the mp3 file to be slower or faster with the push of a button.
This is done with the JavaScript playbackRate method. PlaybackRate defaults to 1.0 and is stored in the React State variable. Depending on the user's choice, the value of the playback rate is increased or decreased by 0.5 per click

CHANGING WEB SPEECH API VALUES ​​AND SETTINGS

The user can change the voice, speed, pitch and volume of the Speech API. The change settings are displayed in the React Carousel component, where the user can select one or more settings that they want to change.
the changed settings are visible to the user in the html-p-tag, from where they are also passed to the JavaScript function that implements the speech synthesis.

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

When loading auxiliary images, a CSS animation is always implemented, which rotates the image 360 ​​degrees.
This feature is made with CSS-animate and Transform methods. Reloading CSS animations is done with two identical CSS classes, which are given alternately as the class name of the div containing the img element.