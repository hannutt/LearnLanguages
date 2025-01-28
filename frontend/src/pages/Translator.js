import axios from "axios"
import { useState } from "react"
function Translator(props) {
    var [translate, setTranslate] = useState([])
    var [alt,setAlt]=useState(0)
    var [selLanguage, setSelLanguage] = useState("")
    const [listenTranslate, setListenTranslate] = useState(true)
    const [ltStart,setLtStart]=useState(false)
    const [lsClose,setLsClose]=useState(true)
    var [countryCode, setCountryCode] = useState("")

    const getGeoLocation = () => {
        var geoapk = localStorage.getItem("geoapk")
        fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${geoapk}`)
          .then(response => response.json())
          //haetaan vain maa ja maan iso-koodi tulosjoukosta ja talletetaan se statemuuttujaan
          .then(result => setCountryCode(countryCode = result.country.iso_code))
          .catch(error => console.log('error', error));
    
      }
      getGeoLocation()

    const runcmd = () => {
        setLtStart(!ltStart)
        setLsClose(!lsClose)
        const res = axios.get("http://localhost:8800/shell")

    }

    const closeCmd=()=>{
        setLtStart(!ltStart)
        setLsClose(!lsClose)
        const res=axios.get("http://localhost:8800/closeShell")
    }

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
        props.setTranslatedQuestion(!props.translatedQuestion)
        setListenTranslate(!listenTranslate)

        var questionTranslate = document.getElementById("question").innerText
        const res = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            body: JSON.stringify({
                q: questionTranslate,
                source: "auto",
                //kieli johon käännetään on käyttäjän valitsema ja se on talletettu state muuttujaan
                target: selLanguage,
                alternatives: alt,
            }),
            headers: { "Content-Type": "application/json" }
        });

        //json tulosjoukko talletetaan data muuttujaan, että sitä voidaan käyttää translate statessa
        var data = await res.json()
        //jos alt suurempi kuin 0, näytetään muuttujan määrän mukaisesti vaihtoehtoisia käännöksiä.
        if (alt > 0) {
            setTranslate(translate = data.alternatives)
        }
        else {
            setTranslate(translate = data.translatedText)

        }


    }
    return (
        <div>
            
            
            <br></br>
            <button onClick={()=>setSelLanguage(selLanguage=countryCode.toLowerCase())} class="btn btn-warning btn-sm">Set {countryCode.toLowerCase()} to text to speech language?</button>
            <div className='options' hidden={props.translateOptions}>
            <p hidden id='selectedLanguage'>{selLanguage}</p>
            


                <span className='translateBtn'>
                    <button class="btn btn-primary btn-sm" onClick={translateText}>Translate question</button>
                    <button class="btn btn-info btn-sm" hidden={listenTranslate} onClick={listen}>Listen translated question</button>
                </span>
                <br></br>
                <button class="btn btn-info btn-sm" hidden={ltStart} onClick={runcmd}>Start libretranslate</button>
                <button class="btn btn-primary btn-sm" hidden={lsClose} onClick={closeCmd}>Close libretranslate</button>
            </div>
            <br></br>
            <select id='alternatives' hidden={props.translateOptions} onChange={e =>setAlt(e.target.value)}>
                <option selected>Alternatives</option>
                <option>1</option>
                <option>2</option>
            </select>
            <select name="language" id="language" hidden={props.translateOptions} className='language' onChange={e =>setSelLanguage(e.target.value)}>
                <option selected >Select language </option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="fr">French</option>
            </select>
            <center>
                <br></br>
                <p id='translatedQuestion' className='translatedQuestion' hidden={props.translatedQuestion}>{translate}</p>
            </center>
        </div>
    )
}
export default Translator