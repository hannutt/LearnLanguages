import { useState } from "react";
function SpeechOptions () {
  
    var [voices,setVoices]=useState([])
    
    const voiceOptions = () => {
        //talletetaan taulukkoon kaikki web speech apin äänet
        setVoices(voices= speechSynthesis.getVoices());
}
    return(
        <div className="mainDiv">
            <button onClick={voiceOptions}>Show voices</button>
            <select>
            {voices.map(v=>(
                <option>{v.name}</option>
            ))}
            </select>
        </div>
    )
}
export default SpeechOptions;