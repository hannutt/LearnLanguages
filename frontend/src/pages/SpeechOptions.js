import { useState } from "react";
function SpeechOptions() {

    var [voices, setVoices] = useState([])


    //evt parametri on select valikosta valitun äänen value arvo
    const selectedVoice = (evt) => {
        console.log(evt)
        document.getElementById("selectedVoice").innerText = evt

    }

    const voiceOptions = () => {
        //talletetaan taulukkoon kaikki web speech apin äänet
        setVoices(voices = speechSynthesis.getVoices());
    }
    return (
        <div className="mainDiv">
            <span><b>Select voice</b></span>
            <select onClick={voiceOptions} onChange={e => selectedVoice(e.target.value)}>
                {/*index on listan indeksinumero, se alkaa luvusta 0 */}
                {voices.map((v, index) => (

                    <option value={index}>{v.name}</option>
                ))}
            </select>

        </div>
    )
}

function SpcRate() {
    var rateval = []

    const loop = () => {
        //kasvatetaan i-muuttujaa arvolla 0.1 eli listaan tulee arvot väliltä 0.1-1
        for (var i = 0.1; i < 1; i += 0.1) {
            //math roundin avulla vältetään ylimääräiset desimaalit tuloksessa.
            rateval.push(Math.round(i*100)/100)
        }
    }
    loop()


    const rateValue = (evt) => {

        console.log(evt)

        document.getElementById("selectedRate").innerText = evt


    }
    return (
        <div>
            <span><b>Select speech rate</b></span>
            <select onChange={e => rateValue(e.target.value)}>
                <option selected>Select</option>
                {rateval.map(i => (
                    <option>{i}</option>

                ))}

            </select>

        </div>
    )
}

function VolumeSlider() {
    const showValue = () => {
        var slider = document.getElementById("volumeRange")
        //slider.value on säätimen kulloinenkin arvo, tässä tapauksessa se on väliltä 0.1-1.0
        document.getElementById("selectedVolume").innerText = slider.value

    }
    return (
        <div>
            <span><b>Change volume</b></span>

            <input type="range" min="0" max="1" step={0.1} class="slider" id="volumeRange" onInput={showValue}></input>
        </div>
    )
}
function SetPitch() {

    const getSelected = (evt) => {
       document.getElementById("selectedPitch").innerText=evt

    }
    return (
        <div>
            <span><b>Set pitch</b></span>

            <select onChange={e => getSelected(e.target.value)}>
                <option selected>Select</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
            </select>

        </div>
    )


}
export {
    SpeechOptions,
    SpcRate,
    VolumeSlider,
    SetPitch,
}