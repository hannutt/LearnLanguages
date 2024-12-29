
import hello from '../sounds/hello.mp3'
import dog from '../sounds/dog-barking.mp3'
import axios from 'axios'
import { useState } from 'react'
function ListenSentences() {
    
var [voiceText,SetVoiceText]=useState("")
var [userContent,setUserContent]=useState("")
   
var sentences=[hello,dog]
var i = 0
    const playVoice=async()=>{
        const res = await axios.get("http://localhost:8800/voice")
        SetVoiceText(res.data[0].voicetxt)
        var audio = new Audio(sentences[i])
        audio.play()
        i+=1
    }
    const checkUserInput=()=>{
        console.log(voiceText)
        
        var apk = localStorage.getItem("apk")
      
       
        const API_URL = "https://api.openai.com/v1/chat/completions"
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apk}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: voiceText }]
          })
    
    
        }
        fetch(API_URL, requestOptions).then(res => res.json()).then(async data => {
          var answer=data.choices[0].message.content
          console.log(answer)
        })
    }
    return(
        <div>
            <button onClick={playVoice}>Listen</button>
            <p hidden id="voicetxt">{voiceText}</p>
            <input type='text' id='answer' placeholder='Write your answer here' onChange={e=>setUserContent(e.target.value)}></input>
            {console.log(userContent)}
            <button onClick={checkUserInput}>Check answer</button>
        </div>
    )

}
export default ListenSentences