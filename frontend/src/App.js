
import './App.css';
import WordInput from "./pages/WordInput"
import axios from "axios"
import learnHeader from "./images/learnHeader.jpg"

import { useState, useEffect } from 'react';


function App() {
  const [startLearn, setStartLearn] = useState(false)
  const [question, setQuestion] = useState([])
  const [questionId, setQuestionId] = useState(1)
  var [table, setTable] = useState("")
  const [doAnimate, setDoAnimate] = useState()
  var [userSelect, setUserSelect] = useState("")
  var [learnCB, setLearnCB] = useState(true)
  var [translate, setTranslate] = useState([])
  var [selLanguage, setSelLanguage] = useState("")
  const [optionsDiv, setOptionsDiv] = useState(true)
  var [translatedQuestion, setTranslatedQuestion] = useState(true)
  var [timeToAnswer, setTimeToAnswer] = useState(60)
  const [limited, setLimited] = useState(false)

  const translateText = async () => {
    setTranslatedQuestion(!translatedQuestion)

    var questionTranslate = document.getElementById("question").innerText
    const res = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      body: JSON.stringify({
        q: questionTranslate,
        source: "auto",
        target: selLanguage,
      }),
      headers: { "Content-Type": "application/json" }
    });
    //json tulosjoukko talletetaan data muuttujaan, että sitä voidaan käyttää translate statessa
    var data = await res.json()
    setTranslate(translate = data.translatedText)

  }


  const handleClick = async () => {
    var savedId = localStorage.getItem("id")
    if (limited) {
      setInterval(() => {
        setTimeToAnswer(timeToAnswer -= 1)

      }, 1000);

    }


    setTranslatedQuestion(translatedQuestion = true)
    setOptionsDiv(!optionsDiv)
    setStartLearn(!startLearn)
    //const res = await axios.get("http://localhost:8800/question/" + questionId)


    //savedid talletetaan localstorageen, jos käyttäjä on klikannut save & continue later painiketta
    //tässä tehdään tarkastus, jos saveid ei ole tyhjä annetaan tallennettu id parametrina
    if (savedId !== null) {
      const res = await axios.get(`http://localhost:8800/tablename/?table=${table}&id=${savedId}`)
      setQuestion(res.data)
      setDoAnimate("animate")

    }
    else {
      {/*lähetetään tietokantataulu ja id queryparam parametreina node.js:lle ? tarkoittaa että queryparamit
    alkaa ja & tarkoittaa seuraavaa queryparamia*/}
      const res = await axios.get(`http://localhost:8800/tablename/?table=${table}&id=${questionId}`)
      setQuestion(res.data)
      setDoAnimate("animate")
    }


  }

  const selection = (ev, evt) => {
    setUserSelect(table = ev)
    setTable(table = evt)
    setLearnCB(learnCB = false)
    console.log(table)

  }
  return (
    <div className="App">
      <img src={learnHeader}></img>
      <br></br>
      <h2 className='lngHeader'>Languages</h2>
      <input class="form-check-input" type="checkbox" id="timeLimitCB" onChange={() => setLimited(!limited)} />
      <label class="form-check-label" for="timeLimitCB">Time Limited?</label>
      <center>
        {/*w-25 muuttaa leveyden 25 prosenttiin*/}
        <select class="form-select form-select-sm w-25" onChange={e => selection(e.target.options[e.target.selectedIndex].text, e.target.value)} aria-label=".form-select-sm example">
          <option selected hidden >Select language to learn</option>

          <option id='opt1' value="questions" >Finnish</option>
          <option id='opt2' value="questionswe">Swedish</option>

        </select>
      </center>


      <center>
        <input class="form-check-input" hidden={learnCB} type="checkbox" value="" id="startLearnCB" onChange={handleClick} />
        <label class="form-check-label" hidden={learnCB} for="startLearnCB">Start learning {userSelect}</label>
      </center>


      <p id='selectedLanguage'>{selLanguage}</p>
      <p>{timeToAnswer}</p>


      <div className='options' hidden={optionsDiv}>
        <select name="language" id="language" onChange={e => setSelLanguage(e.target.value)}>
          <option selected >Select language </option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
        </select>

        <button class="btn btn-primary btn-sm" onClick={translateText}>Translate question</button>
      </div>
      <center>
        <p id='translatedQuestion' className='translatedQuestion' hidden={translatedQuestion}>{translate}</p>
      </center>
      <p id='feedback'></p>
      <br></br>
      {question.map(q => (
        <center>

          {/*animaatio suoritetaan kun doanimaten arvokksi tulee animate merkkijono, eli css-tiedoston
          tyylimääritys*/}
          <p id='animation' className={doAnimate}></p>
          <p id='question' className='question'><b>{q.ask}</b></p>

        </center>
      ))}



      <br></br>
      {/*jos starlearn on true eli checkboksia on klikattu näytetään wordinput komponentti
      samalla lähetetään wordinput komponentille näytettävä kysymys*/}
      {startLearn && <WordInput question={question} setQuestionId={setQuestionId} questionId={questionId} setQuestion={setQuestion} />}

    </div>
  );
}

export default App;
