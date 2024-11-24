import voice from "../images/voice-command.png"
import snail from "../images/snail.png"
import options from "../images/options.png"
import { useState } from "react"
function TextToSpeech() {
    var [voices,setVoices]=useState([])
    const [voicesShow,setVoicesShow]=useState(true)
    var [selectedVoice,setSelectedVoice]=useState("")

    const voiceOptions = () => {
        const utterance = new SpeechSynthesisUtterance()
        utterance.lang="en-US"

        //talletetaan taulukkoon kaikki web speech apin äänet
        setVoices(voices= speechSynthesis.getVoices());
}

    const speech = () => {
        var msg = new SpeechSynthesisUtterance();
        var lang = document.getElementById("selectedLanguage").innerText
        if (lang === '') {
            lang = "en-US"
            msg.text = document.getElementById("question").innerText
            window.speechSynthesis.speak(msg);
        }
        else {
            msg.text = document.getElementById("translatedQuestion").innerText
            msg.lang = lang
            window.speechSynthesis.speak(msg);
        }
    }

    const slowSpeech = () => {
        var msg = new SpeechSynthesisUtterance();
        var lang = document.getElementById("selectedLanguage").innerText
        if (lang === '') {
            lang = "en-US"
            //puheen nopeus
            msg.rate = 0.5
            msg.text = document.getElementById("question").innerText
            window.speechSynthesis.speak(msg);
        }
        else {
            msg.rate = 0.5
            msg.text = document.getElementById("translatedQuestion").innerText
            msg.lang = lang
            window.speechSynthesis.speak(msg);
        }
    }
    return (
        <div>
             <select onChange={e=>setSelectedVoice(e.target.options[e.target.selectedIndex].text)}>
            {voices.map(v=>(
                <option>{v.name}</option>
            ))}
            {console.log(selectedVoice)}
             </select>
             <div className="flex-container">
            <div className="speechBtns1">
                {/*bootstarp tooltipit buttoneissa data-bs-toggle + 2 seuraavaa propertya*/}
                <button class="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Normal speech rate" onClick={speech}><img src={voice}></img></button>
                </div>
                <div className="speechBtns2">
                
                <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Slower speech rate" onClick={slowSpeech}><img src={snail}></img></button>
                </div>
                <div className="speechBtns3"></div>
                <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Speech options" onClick={voiceOptions}><img src={options}></img></button>
            
            </div>

           
        </div>


    )

}
export default TextToSpeech