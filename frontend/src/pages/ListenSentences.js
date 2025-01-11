
import hello from '../sounds/hello.mp3'
import dog from '../sounds/dog-barking.mp3'
import axios from 'axios'
import { useState } from 'react'
import options from "../images/options.png"
function ListenSentences(props) {

  var [voiceText, SetVoiceText] = useState("")
  var [userContent, setUserContent] = useState("")
  var [sentenceVar, setSentenceVar] = useState(0)
  var [pbRate, setPbRate] = useState(1.0)
  const [repeat,setRepeat]=useState(false)
  const [manipulateSpcRate,setManipulateSpcRate]=useState(true)

  var sentences = [hello, dog]

  const playVoice = async () => {
    document.getElementById("repeat").hidden=false
    var audio = new Audio(sentences[sentenceVar])
    //äänitiedoston puheäänen nopeus
    audio.playbackRate = pbRate
    audio.play()

    const updated = sentenceVar + 1
    setSentenceVar(updated)
    const res = await axios.get("http://localhost:8800/voice/" + updated)
    //tietokannan datan talennus stateen.
    SetVoiceText(res.data[0].voicetxt)
   

  }

  const repeatSound=()=>{
    var cb=document.getElementById("repeatCB")
    if (cb.checked==true && sentenceVar===0)
    {
      var audio = new Audio(sentences[0])
      //äänitiedoston puheäänen nopeus
      audio.playbackRate = pbRate
      audio.play()
     
    }
    else if(cb.checked==true && sentenceVar>=1)
    {
      sentenceVar-=1
      console.log(sentences[sentenceVar])
      var audio = new Audio(sentences[sentenceVar])
      //äänitiedoston puheäänen nopeus
      audio.playbackRate = pbRate
      audio.play()

    }
  }


  const checkUserInput = () => {

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
      var gptanswer = data.choices[0].message.content
      gptanswer = gptanswer.toLowerCase()
      if (userContent === gptanswer || gptanswer.includes(userContent)) {
        //nämä statet saadaan parametrina wordinput.js:tä
        props.setCorrectAns(props.correctAns + 1)
      }
      else {
        props.setWrongAns(props.wrongAns + 1)
      }
    })
  }
  return (
    <div>
      
      <button class="btn btn-primary btn-sm" onClick={playVoice}>Listen</button>
      <span id='repeat' className='repeat' hidden>
      <input class="form-check-input" type="checkbox" value="" id="repeatCB" onChange={repeatSound}/>
      <label class="form-check-label" for="repeatCB">Repeat</label>
      </span>
      <p id="voicetxt">{voiceText}</p>
       <p>{pbRate}</p>
        <input type='text' id='answer' placeholder='Write your answer here' onChange={e => setUserContent(e.target.value)}></input>
        <button class="btn btn-primary btn-sm" onClick={checkUserInput}>Check answer</button>
        <button class="btn btn-info btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Manipulate speech rate" onClick={() =>setManipulateSpcRate(!manipulateSpcRate)}><img src={options}></img></button>
        <button hidden={manipulateSpcRate} onClick={()=>setPbRate(pbRate+=0.2)} >+</button><button hidden={manipulateSpcRate} onClick={()=>setPbRate(pbRate-=0.2)}>-</button>
        

    </div>
  )

}
export default ListenSentences