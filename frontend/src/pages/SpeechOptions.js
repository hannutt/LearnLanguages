import { useState } from "react";
function SpeechOptions() {

    var [voices, setVoices] = useState([])

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
            <button class="btn btn-primary btn-sm" onClick={voiceOptions}>Show voices</button>
            <select onChange={e => selectedVoice(e.target.value)}>
                {voices.map((v,index)=> (
                    <option value={index}>{v.name}</option>
                ))}
            </select>
            
        </div>
    )
}

function SpcRate() {

    const rateValue = (evt) => {
        console.log(evt)
        document.getElementById("selectedRate").innerText = evt


    }
    return (
        <div>
            <span>Select speech rate</span>
            <select onChange={e => rateValue(e.target.value)}>
                <option selected>Select</option>
                <option value={0.1}>0.1</option>
                <option value={0.2}>0.2</option>
                <option value={0.3}>0.3</option>
                <option value={0.4}>0.4</option>
                <option value={0.5}>0.5</option>
                <option value={0.6}>0.6</option>
                <option value={0.7}>0.7</option>
                <option value={0.8}>0.8</option>
                <option value={0.9}>0.9</option>
                <option value={1}>1</option>
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
            <span>Change volume</span>

            <input type="range" min="0" max="1" step={0.1} class="slider" id="volumeRange" onInput={showValue}></input>
        </div>
    )
}
function SetPitch() {
    return (
        <div>
            <span>Set pitch</span>

            <select>
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