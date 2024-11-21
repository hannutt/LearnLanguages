import { useState } from "react";
import axios from "axios"


function WordInput(props) {
  const [userInput, setUserInput] = useState("")
  const [askedQuestion, setAskedQuestion] = useState("")
  const [correctAns, setCorrectAns] = useState(0)
  const [wrongAns, setWrongAns] = useState(0)

  const handleClick = async () => {
    
    var apk = localStorage.getItem("apk")
 
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

      if (userInput === answerLower || answerLower.includes(userInput)) {
        setCorrectAns(correctAns + 1)

      }
      else {
        setWrongAns(wrongAns+1)
      }
    }).catch((error) => {
      console.log(error)

    })


  }
  return (

    <div>
      {/*
            {props.question.map(q=>(
            <p id='question'><b>{q.ask}</b></p>          
        ))}
            */}


      <input id='userInput' placeholder='Your answer' onChange={e => setUserInput(e.target.value.toLowerCase())}></input>
      <button id="inputBtn" onClick={handleClick}>Check</button>
      <h5 className="correct">Correct answers: {correctAns}</h5>
      <h5 className="wrong">Wrong answers: {wrongAns}</h5>
    </div>
  )
}
export default WordInput;