
import './App.css';
import './index.css';
import WordInput from "./pages/WordInput"
import DragnDrop from "./pages/DragnDrop.js"
import axios from "axios"
import learnHeader from "./images/learnHeader.jpg"
import words from './pages/words.json'
import { useState, useEffect } from 'react';
import voicecommand from './images/voice-command.png'
import ImageOptions from './pages/ImageOptions.js'



function App() {
  const [startLearn, setStartLearn] = useState(false)
  const [question, setQuestion] = useState([])
  const [questionId, setQuestionId] = useState(1)
  var [table, setTable] = useState("")

  var [userSelect, setUserSelect] = useState("")
  var [learnCB, setLearnCB] = useState(true)
  var [translate, setTranslate] = useState([])
  var [selLanguage, setSelLanguage] = useState("")
  const [optionsDiv, setOptionsDiv] = useState(true)
  var [translatedQuestion, setTranslatedQuestion] = useState(true)
  var [timeToAnswer, setTimeToAnswer] = useState(20)
  const [limited, setLimited] = useState(false)
  const [hideImage, setHideImage] = useState(true)
  var [animateDiv, setAnimateDiv] = useState("helperImage")
  const [listenTranslate, setListenTranslate] = useState(true)
  const [comWords, setComWords] = useState(true)
  const [helperImg, setHelperImg] = useState(false)
  const [translateOptions, setTranslateOptions] = useState(true)
  var [countryCode, setCountryCode] = useState("")

  const getGeoLocation = () => {
    var geoapk = localStorage.getItem("geoapk")
    fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${geoapk}`)
      .then(response => response.json())
      //haetaan vain maa ja maan iso-koodi tulosjoukosta ja talletetaan se statemuuttujaan
      .then(result => setCountryCode(countryCode = result.country.iso_code))
      .catch(error => console.log('error', error));


  }


  //getGeoLocation()

  const askName = () => {

    //tarkistetaan onko loclastoragessa player key
    if (localStorage.getItem("player") === null) {
      var name = prompt("Enter your name")
      localStorage.setItem("player", name)

    }
    else {
      console.log("player ok")
    }

  }
  //askName()

  useEffect(() => {
    askName()

  }, [])


  //data parametrin arvo saadaan wordinput komponentista, parametri sisältää wordinput komponentissa
  //määritetyn feedback state-muuttujan.
  const getFeedback = (data) => {

    document.getElementById("feedback").innerText = data
    setTimeout(() => {
      //feedback elementin sisältö poistetaan 3 sek kuluttua.
      document.getElementById("feedback").innerText = ""

    }, 3000);

  }
  //funktio toteuttaa tekstin puheeksi käännetyn kysymyksen osalta
  const listen = () => {
    //käännetty kysymys
    var q = document.getElementById("translatedQuestion").innerText

    const utterance = new SpeechSynthesisUtterance(q);
    //puheen kielen asetus
    utterance.lang = selLanguage
    speechSynthesis.speak(utterance);
  }


  //libretranslaten käyttö kääntämiseen
  const translateText = async () => {
    setTranslatedQuestion(!translatedQuestion)
    setListenTranslate(!listenTranslate)

    var questionTranslate = document.getElementById("question").innerText
    const res = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      body: JSON.stringify({
        q: questionTranslate,
        source: "auto",
        //kieli johon käännetään on käyttäjän valitsema ja se on talletettu state muuttujaan
        target: selLanguage,
      }),
      headers: { "Content-Type": "application/json" }
    });
    //json tulosjoukko talletetaan data muuttujaan, että sitä voidaan käyttää translate statessa
    var data = await res.json()
    setTranslate(translate = data.translatedText)

  }

const timelimit=()=>{
  const interval=setInterval(() => {
    setTimeToAnswer(timeToAnswer -= 1)
    if (timeToAnswer==0)
      {
        //lopetetaan intervalin suoritus
        clearInterval(interval)
      }

  }, 1000);


}


  const handleClick = async () => {
   
    setTranslatedQuestion(translatedQuestion = true)
    setOptionsDiv(!optionsDiv)
    setStartLearn(!startLearn)
    setHideImage(!hideImage)
    //const res = await axios.get("http://localhost:8800/question/" + questionId)



    {/*lähetetään tietokantataulu ja id queryparam parametreina node.js:lle ? tarkoittaa että queryparamit
    alkaa ja & tarkoittaa seuraavaa queryparamia*/}
    const res = await axios.get(`http://localhost:8800/tablename/?table=${table}&id=${questionId}`)
    setQuestion(res.data)

  }



  //evt on select-komponentista valitun taulun nimi
  const selection = (ev, evt) => {
    setUserSelect(table = ev)
    setTable(table = evt)
    setLearnCB(learnCB = false)


  }
  const voice = (id, langcode) => {

    var text = document.getElementById(id).innerText
    var arr = text.split(":")
    var msg = new SpeechSynthesisUtterance();
    if (langcode === 'Finnish') {
      msg.lang = "fi"


    }
    else if (langcode === "Swedish") {
      msg.lang = "sv"
    }

    msg.text = arr[0]
    window.speechSynthesis.speak(msg);



  }
  const runcmd = () => {
    const res = axios.get("http://localhost:8800/shell")
  }

  return (
    <div className="App">
      <img src={learnHeader} alt='Header'></img>
      <br></br>
      <h2 className='lngHeader'>Languages</h2>
      <p>{countryCode.toLowerCase()}</p>

      <center>
        {/*w-25 muuttaa leveyden 25 prosenttiin*/}
        <select class="form-select form-select-sm w-25" onChange={e => selection(e.target.options[e.target.selectedIndex].text, e.target.value)} aria-label=".form-select-sm example">
          <option selected >Select language to learn</option>
          <option id='opt1' value="questions">Finnish</option>
          <option id='opt2' value="questionswe">Swedish</option>
        </select>


      </center>
      <span className='comWordBtn'>
        <button hidden={learnCB} class="btn btn-primary btn-sm" onClick={() => { setComWords(!comWords); setLearnCB(!learnCB) }}>Show Common {userSelect} words</button>
      </span>

      <center>

        {/*json tiedoston olioiden läpikäynti map funktiolla ja tulostus p-tagiin*/}
        {words.map((w) => (
          <div className='comWords' hidden={comWords}>
            {/*näytetään userselectin arvosta riippuen json-tiedostosta joko fi-en tai fi-sv arvot*/}
            {userSelect === "Finnish" && <p id={w.id}>{w.fi} : {w.en} </p>}
            {userSelect === "Swedish" && <p id={w.id}> {w.sv} : {w.en}</p>}
            <span className='comwordsP'>
              {/*voice funktio saa parametrina id:n (w.id) ja valitun kielen (userselect)*/}
              <button class="btn btn-info btn-sm" onClick={() => voice(w.id, userSelect)}><img src={voicecommand}></img></button>
            </span>

          </div>
        ))}
        {/*buttoni palauttaa aloitusnäkymän, eli sanalista häviää ja select, cb yms näytetäät*/}
        <button onClick={() => { setComWords(!comWords); setLearnCB(!learnCB) }} hidden={comWords}>X</button>

      </center>


      <center>
        <input class="form-check-input" hidden={learnCB} type="checkbox" id="startLearnCB" onChange={handleClick} />
        <label class="form-check-label" hidden={learnCB} for="startLearnCB">Start learning {userSelect}</label>
        <br></br>
        <input class="form-check-input" hidden={learnCB} type="checkbox" id="timeLimitCB" onChange={timelimit} />
        <label class="form-check-label" hidden={learnCB} for="timeLimitCB">Time Limited?</label>
        <br></br>

      </center>

      <p id='selectedLanguage'>{selLanguage}</p>
      <p>{timeToAnswer}</p>

      <div hidden={learnCB}>
        <input class="form-check-input" type="checkbox" value="" id="translateOpt" onChange={() => setTranslateOptions(!translateOptions)} />
        <label class="form-check-label" for="translateOpt">
          Show translate options
        </label>
        <br></br>

      </div>


      <div className='options' hidden={translateOptions}>
        <select name="language" id="language" className='language' onChange={e => setSelLanguage(e.target.value)}>
          <option selected >Select language </option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
        </select>
        <span className='translateBtn'>
          <button class="btn btn-primary btn-sm" onClick={translateText}>Translate question</button>
          <button class="btn btn-info btn-sm" hidden={listenTranslate} onClick={listen}>Listen translated question</button>
        </span>
        <br></br>
        <button class="btn btn-info btn-sm" onClick={runcmd}>Start libretranslate</button>
      </div>
      <center>
        <br></br>
        <p id='translatedQuestion' className='translatedQuestion' hidden={translatedQuestion}>{translate}</p>
      </center>
      <p id='feedback' className='feedback'></p>
      <br></br>
      {question.map(q => (

        <center>
          <ImageOptions setHelperImg={setHelperImg} helperImg={helperImg} setHideImage={setHideImage} hideImage={hideImage} q={q} setAnimateDiv={setAnimateDiv} animateDiv={animateDiv} learnCB={learnCB} />
        </center>
      ))}
      <br></br>
      {/*jos starlearn on true eli checkboksia on klikattu näytetään wordinput komponentti
      samalla lähetetään wordinput komponentille näytettävä kysymys huomaa getfeedback apufunktion lähetys wordinput komponentille*/}
      {startLearn && <WordInput question={question} setQuestionId={setQuestionId} questionId={questionId} setQuestion={setQuestion} getFeedback={getFeedback} table={table} hideImage={hideImage} setHideImage={setHideImage} setOptionsDiv={setOptionsDiv} optionsDiv={optionsDiv} timeToAnswer={timeToAnswer} setTimeToAnswer={setTimeToAnswer} timelimit={timelimit} />}
        <DragnDrop/>
    </div>
  );
}

export default App;
