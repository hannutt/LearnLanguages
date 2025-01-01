
import hello from '../sounds/hello.mp3'
import dog from '../sounds/dog-barking.mp3'
import axios from 'axios'
import { useState } from 'react'
import options from "../images/options.png"
function ListenSentences(props) {
    
var [voiceText,SetVoiceText]=useState("")
var [userContent,setUserContent]=useState("")
const [sentenceVar,setSentenceVar]=useState(0)
var [pbRate,setPbRate]=useState(1.0)
   
var sentences=[hello,dog]

    const playVoice=async ()=>{
      console.log(pbRate)
      
      var audio = new Audio(sentences[sentenceVar])
      //äänitiedoston puheäänen nopeus
      audio.playbackRate=pbRate
      audio.play()

      const updated = sentenceVar+1
      setSentenceVar(updated)
      const res = await axios.get("http://localhost:8800/voice/"+updated)
        //tietokannan datan talennus stateen.
      SetVoiceText(res.data[0].voicetxt)
    

    }

   
    const checkUserInput=()=>{
        
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
          var gptanswer=data.choices[0].message.content
          gptanswer=gptanswer.toLowerCase()
          if (userContent===gptanswer || gptanswer.includes(userContent))
          {
            //nämä statet saadaan parametrina wordinput.js:tä
            props.setCorrectAns(props.correctAns+1)
          }
          else{
            props.setWrongAns(props.wrongAns+1)
          }
        })
    }
    return(
        <div>
            <button class="btn btn-primary btn-sm" onClick={playVoice}>Listen</button>
            <p id="voicetxt">{voiceText}</p>
            <input type='text' id='answer' placeholder='Write your answer here' onChange={e=>setUserContent(e.target.value)}></input>
            <button class="btn btn-primary btn-sm" onClick={checkUserInput}>Check answer</button>
            <button class="btn btn-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Manipulate speech rate"onClick={()=>setPbRate(pbRate=0.5)}><img src={options}></img></button>
            
        </div>
    )

}
export default ListenSentences