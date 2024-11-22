import voice from "../images/voice-command.png"
import snail from "../images/snail.png"
function TextToSpeech() {

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
                <button onClick={speech}><img src={voice}></img></button>
                <button onClick={slowSpeech}><img src={snail}></img></button>
            </div>
        )
    
}
export default TextToSpeech