import { useState } from "react";
import axios from "axios"
import TextToSpeech from "./TextToSpeech";
import { Chart } from "react-google-charts";
import microphone16px from "../images/microphone16px.png"

function WordInput(props) {
  const [userInput, setUserInput] = useState("")
  const [askedQuestion, setAskedQuestion] = useState("")
  const [correctAns, setCorrectAns] = useState(0)
  const [wrongAns, setWrongAns] = useState(0)
  const [visualization,setVisualization]=useState(false)
  var [cType,setCtype]=useState("")
  var [feedback,setFeedback]=useState("")
  var [answerForHint,setAnswerForHint]=useState("")
  var [iHint,setIhint]=useState(0)

  const saveId = () =>{
    localStorage.setItem("id",props.questionId)
  }

  //ev parametri sisältää checkboxin value propertyn
  const dataVisualization=(ev)=>{
    setVisualization(!visualization)
    setCtype(cType=ev)

  }


  const askHint=async ()=>{
      
      const res = await axios.get("http://localhost:8800/askhint/" + props.questionId)
      setAnswerForHint(answerForHint=res.data)
      console.log(answerForHint[0].hinttext[iHint])
      document.getElementById("userInput").value+=answerForHint[0].hinttext[iHint]
      setIhint(iHint+1)
      if (iHint > answerForHint.length)
      {
        document.getElementById("userInput").value=answerForHint[0].hinttext
      }
      
    }

  const handleClick = async () => {
    
    var apk = localStorage.getItem("apk")
    document.getElementById("translatedQuestion").hidden=true
    //asynkrooninen staten päivitys, eli näin staten arvo saadaan päivittymään
    //heti kun funktio suoritetaan.
    const updatedId = props.questionId + 1
    props.setQuestionId(updatedId)
    console.log(updatedId)
    const res = await axios.get("http://localhost:8800/question/" + updatedId)
    console.log(res.data)
    props.setQuestion(res.data)
    //console.log(userInput)
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
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
      var answer=data.choices[0].message.content
      var answerLower=answer.toLowerCase()
      setAnswerForHint(answerLower)

      if (userInput === answerLower || answerLower.includes(userInput)) {
        setCorrectAns(correctAns + 1)
        setFeedback(feedback="CORRECT")
        //kutsutaan apps.js:llä olevaa apufunktiota, jolle annetaan parametrina feedback state
        props.getFeedback(feedback)
        //jos vastaus on oikea, niin nollataan askhint funktion kierrosmuuttuja
        setIhint(iHint=0)

      }
      else {
        setWrongAns(wrongAns+1)
        setIhint(iHint=0)
      }
    }).catch((error) => {
      console.log(error)

    })


  }
  return (

    <div>
      <div className="flex-containerWI">
      <input id='userInput' className="userInput" placeholder='Your answer' onChange={e => setUserInput(e.target.value.toLowerCase())}></input>
      <div className="inputBtnDiv">
      <button id="inputBtn" class="btn btn-info btn-sm" onClick={handleClick}>Check answer</button>
      </div>
      <div className="microphone">
        <button class="btn btn-info btn-sm"><img src={microphone16px}></img></button>
      </div>
      <div className="hintBtnDiv">
      <button class="btn btn-info btn-sm" onClick={askHint}>Ask hint</button>
      </div>
      </div>
      <span className="saveBtn">
      <button id="save" class="btn btn-info" onClick={saveId}>Save & continue later</button>
      </span>
      
      <TextToSpeech/>
      <div className="answers">
      <h5 className="correct">Correct answers: {correctAns}</h5>
      <h5 className="wrong">Wrong answers: {wrongAns}</h5>
      </div>
      <div className="visualDiv">
        {/*datavisualization funktio saa onchangessa parametrina checkboksin valuen eli Gauge */}
      <input class="form-check-input" type="checkbox" id="visualCB" value="Gauge" onChange={e=>dataVisualization(e.target.value)}/>
      <label class="form-check-label" for="visualCB">Show data visualization in Cauge</label>
      <br></br>
      <input class="form-check-input" type="checkbox" id="visualCB2" value="PieChart" onChange={e=>dataVisualization(e.target.value)} />
      <label class="form-check-label" for="visualCB2">Show data visualization in Pie Chart</label>
      </div>
      <center>
        {/*google chartin valinta gauge/piechart riippuen ctypen arvost*/}
        {visualization && cType=="Gauge" && <Chart
      // google chart komponentti
      chartType={cType}
      data={[
        ["Label","Value"],
        ["Wrong",wrongAns],
        ["Correct",correctAns],
        
     
      ]}
 
    />}
    {visualization && cType==="PieChart" && <Chart
      // google chart komponentti
      chartType={cType}
      data = {[
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