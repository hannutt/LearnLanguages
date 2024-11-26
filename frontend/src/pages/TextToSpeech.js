import voice from "../images/voice-command.png"
import snail from "../images/snail.png"
import options from "../images/options.png"
import { useState } from "react"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import  {SpeechOptions,SpcRate,VolumeSlider, SetPitch} from "./SpeechOptions";

function TextToSpeech() {

    const [voicesShow, setVoicesShow] = useState(true)
    var [selectedVoice, setSelectedVoice] = useState("")
    const [carouselVis,setCarouselVis]=useState(true)

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      
      

    const showCarousel = () => {
        setCarouselVis(!carouselVis)
    
    }

    const speech = () => {
        var voiceList = speechSynthesis.getVoices()
        var speechRate = document.getElementById("selectedRate").innerText
        var speechRateInt = parseInt(speechRate)
        var selectedVolume = document.getElementById("selectedVolume").innerText
        var volumeFloat = parseFloat(selectedVolume)
        var speakVoice=document.getElementById("selectedVoice").innerText
        var speakNumber = parseInt(speakVoice)
        //jos selectedrate p-tagi on tyhjä, speech rate on 1
        if (speechRate==='' && volumeFloat==="" )
        {
            speechRateInt=1.0
            volumeFloat=1.0
        }
        var msg = new SpeechSynthesisUtterance();
        msg.volume=volumeFloat
        msg.voice=voiceList[speakNumber]
        
        //valittu kieli, esim jos saksa on valittu, speech synthesis puhuu silloin saksaa.
        var lang = document.getElementById("selectedLanguage").innerText
        //speechraten asetus
        msg.rate=speechRateInt
        if (lang === '') {
            lang = "en-US"
            
            msg.text = document.getElementById("question").innerText
            window.speechSynthesis.speak(msg);
        }
        else if (lang !=='') {
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
          
            <div className="flex-container">
                <div className="speechBtns1">
                    {/*bootstarp tooltipit buttoneissa data-bs-toggle + 2 seuraavaa propertya*/}
                    <button class="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Normal speech rate" onClick={speech}><img src={voice}></img></button>
                </div>
                <div className="speechBtns2">

                    <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Slower speech rate" onClick={slowSpeech}><img src={snail}></img></button>
                </div>
                <div className="speechBtns3"></div>
                <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Speech options" onClick={showCarousel}><img src={options}></img></button>


            </div> 
            <br></br>
            <div id="carouselDiv" hidden={carouselVis}>
                <Carousel responsive={responsive} showDots={true}>
                    <SpeechOptions />
                    <SpcRate/>
                    <VolumeSlider/>
                    <SetPitch/>
                    
                </Carousel>
            </div>


        </div>


    )

}
export default TextToSpeech