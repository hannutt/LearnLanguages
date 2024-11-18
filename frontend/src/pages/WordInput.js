import { useState } from "react";
import axios from "axios"


function WordInput(props) {
  const [userInput,setUserInput]=useState("")
  const [askedQuestion,setAskedQuestion]=useState("")
 
  const handleClick=async ()=>{
    
    var apk=localStorage.getItem("apk")
    //asynkrooninen staten päivitys, eli näin staten arvo saadaan päivittymään
    //heti kun funktio suoritetaan.
   
    const updatedId=props.questionId+1
    props.setQuestionId(updatedId+1)
  
    const res = await axios.get("http://localhost:8800/question/"+updatedId)
    console.log(res.data)
    props.setQuestion(res.data)
    //console.log(userInput)
    const API_URL="https://api.openai.com/v1/chat/completions"
    

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${apk}`
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role: "user", content: props.question[0].ask}]
        })


    }
    fetch(API_URL,requestOptions).then(res=>res.json()).then(data => {
        console.log(data.choices[0].message.content)
        if (userInput==data.choices[0].message.content || data.choices[0].message.content.includes(userInput))
        {
          alert("correct")
          
        }
       
       
    }).catch((error)=>{
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
        
         
        <input id='userInput' placeholder='Your answer' onChange={e=>setUserInput(e.target.value)}></input>
        
        <button id="inputBtn" onClick={handleClick}>Check</button>
        
      </div>
    )
}
export default WordInput;