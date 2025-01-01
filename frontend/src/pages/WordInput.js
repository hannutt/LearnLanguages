import { useState } from "react";
import axios from "axios"
import TextToSpeech from "./TextToSpeech";
import { Chart } from "react-google-charts";
import microphone16px from "../images/microphone16px.png"
import ListenSentences from '../pages/ListenSentences';

function WordInput(props) {
  const [userInput, setUserInput] = useState("")

  const [correctAns, setCorrectAns] = useState(0)
  const [wrongAns, setWrongAns] = useState(0)
  const [visualization, setVisualization] = useState(false)
  var [cType, setCtype] = useState("")
  var [feedback, setFeedback] = useState("")
  var [answerForHint, setAnswerForHint] = useState("")
  var [iHint, setIhint] = useState(0)
  var [countClicks, setCountClicks] = useState(1)
  const [listenCB, setListenCB] = useState(false)
  const [flexCont, setFlexCont] = useState(false)


  //mikrofonin kautta saadun äänen muunto tekstiksi.
  const VoiceTotext = () => {
    setCountClicks(countClicks + 1)
    console.log(countClicks)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'fi-FI';
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      document.getElementById("userInput").value = transcript
      recognition.onspeechend = () => {
        recognition.stop();
        console.log("Speech recognition has stopped.");

      }

    }
  }


  const saveId = () => {
    localStorage.setItem("id", props.questionId)
  }

  //ev parametri sisältää checkboxin value propertyn
  const dataVisualization = (ev) => {
    setVisualization(!visualization)
    setCtype(cType = ev)

  }


  const askHint = async () => {

    const res = await axios.get("http://localhost:8800/askhint/" + props.questionId)
    setAnswerForHint(answerForHint = res.data)
    console.log(answerForHint[0].hinttext[iHint])
    document.getElementById("userInput").value += answerForHint[0].hinttext[iHint]
    //iHint on kierrosmuuttuja, jonka avulla näytetään aina seuraava kirjain.
    setIhint(iHint + 1)
    //tarkistus jos kierrosmuuttuja on suurempi kuin sanan pituus
    if (iHint > answerForHint.length) {
      document.getElementById("userInput").value = answerForHint[0].hinttext
    }

  }

  
  const handleClick = async () => {    
    console.log(props.table)
    
    var apk = localStorage.getItem("apk")
    document.getElementById("translatedQuestion").hidden = true

    const API_URL = "https://api.openai.com/v1/chat/completions"
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apk}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: props.question[0].ask }]
      })


    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(async data => {
      var answer = data.choices[0].message.content
      var answerLower = answer.toLowerCase()
      setAnswerForHint(answerLower)


      if (userInput === answerLower || answerLower.includes(userInput)) {
        //asynkrooninen staten päivitys, eli näin staten arvo saadaan päivittymään
        const updatedId = props.questionId + 1
        props.setQuestionId(updatedId)
        console.log(updatedId)

        //käyttäjän valinnasta riippuen valitaan toinen endpointeista
        //valinta saadaan app.js:n select komponentista
        if (props.table==="questions")
        {
          const res = await axios.get("http://localhost:8800/question/" + updatedId)
          props.setQuestion(res.data)

        }
        else if (props.table==="questionswe")
        {
          const res = await axios.get("http://localhost:8800/questionswe/" + updatedId)
          props.setQuestion(res.data)
        }
        
        //console.log(res.data)
        //props.setQuestion(res.data)
        setCorrectAns(correctAns + 1)
        setFeedback(feedback = "CORRECT")
        //kutsutaan apps.js:llä olevaa apufunktiota, jolle annetaan parametrina feedback state
        props.getFeedback(feedback)
        //jos vastaus on oikea, niin nollataan askhint funktion kierrosmuuttuja
        setIhint(iHint = 0)
        /*
        if (updatedId>=4 && failedQuestions.length>0)
          {
            
            const res = await axios.get("http://localhost:8800/question/" +1)
            console.log(res.data)
            props.setQuestion(res.data)
  
          }*/

        //css-animaation toteutus aina uuden kuvan yhteydessä. tässä tapauksessa
        //animaatio toteutetaan vaihtamalla css-luokan nimeä helperImage-helperImageRestart välillä
        //luokan vaihtamisella saadaan käynnistettyä animaatio aina uudelleen.
        if (document.getElementById("helper").className === "helperImageRestart") {
          document.getElementById("helper").className = "helperImage"
        }
        else if (document.getElementById("helper").className === "helperImage") {
          document.getElementById("helper").className = "helperImageRestart"
        }


      }
      else if (userInput !== answerLower || answerLower.includes(!userInput)) {
        setFeedback(feedback = "INCORRECT")
        //kutsutaan apps.js:llä olevaa apufunktiota, jolle annetaan parametrina feedback state
        props.getFeedback(feedback)
        setWrongAns(wrongAns+1)
      }

    }).catch((error) => {
      console.log(error)

    })


  }
  return (

    <div>
      <input class="form-check-input" type="checkbox" id="listenCB" onChange={() => { setListenCB(!listenCB); setFlexCont(!flexCont) }} />
      <label class="form-check-label" for="listenCB">Listen to the sentences</label>
      <p id="selectedRate"></p>
      <p id="selectedVoice"></p>
      <p id="selectedVolume"></p>
      {/*päivitetään correctAns/wrongsAns statea listensentences komponentissa antamalla ne parametrina listensentences komponentille*/}
      {listenCB && <ListenSentences setCorrectAns={setCorrectAns} correctAns={correctAns} setWrongAns={setWrongAns} wrongAns={wrongAns} />}

      <div className="flex-containerWI" hidden={flexCont}>
        <input id='userInput' className="userInput" placeholder='Your answer' onChange={e => setUserInput(e.target.value.toLowerCase())}></input>
        <div className="inputBtnDiv">
          <button id="inputBtn" class="btn btn-info btn-sm" onClick={handleClick}>Check answer</button>
        </div>
        <div className="microphone">
          <button class="btn btn-info btn-sm" onClick={VoiceTotext}><img src={microphone16px} alt="microphone"></img></button>
        </div>

        <div className="hintBtnDiv">
          <button class="btn btn-info btn-sm" onClick={askHint}>Ask hint</button>
        </div>
      </div>
      <span className="saveBtn">
        <button id="save" class="btn btn-info btn-sm" onClick={saveId}>Save & continue later</button>
      </span>
      {/*lähetetään texttospeech komponentille flexcont state muuttuja*/}
      <TextToSpeech flexCont={flexCont} />
      <div className="answers">
        <h5 className="correct">Correct answers: {correctAns}</h5>
        <h5 className="wrong">Wrong answers: {wrongAns}</h5>
      </div>
      <div className="visualDiv">
        {/*datavisualization funktio saa onchangessa parametrina checkboksin valuen eli Gauge */}
        <input class="form-check-input" type="checkbox" id="visualCB" value="Gauge" onChange={e => dataVisualization(e.target.value)} />
        <label class="form-check-label" for="visualCB">Show data visualization in Cauge</label>
        <br></br>
        <input class="form-check-input" type="checkbox" id="visualCB2" value="PieChart" onChange={e => dataVisualization(e.target.value)} />
        <label class="form-check-label" for="visualCB2">Show data visualization in Pie Chart</label>
      </div>


      <center>
        {/*google chartin valinta gauge/piechart riippuen ctypen arvost*/}
        {visualization && cType === "Gauge" && <Chart
          // google chart komponentti
          chartType={cType}
          data={[
            ["Label", "Value"],
            ["Wrong", wrongAns],
            ["Correct", correctAns],


          ]}

        />}
        {visualization && cType === "PieChart" && <Chart
          // google chart komponentti
          chartType={cType}
          data={[
            ["Answers", ""],
            ["Correct", correctAns],
            ["Wrong", wrongAns],

          ]}
        />}
      </center>

    </div>
  )
}
export default WordInput;