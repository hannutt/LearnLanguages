import { useState } from "react"
import axios from "axios"
function Scores() {
    var [scoreData,setScoreData]=useState([])

    const showScores=async ()=>{
        //suoritetaan endpointissa oleva funktio
        const res= await axios.get('http://localhost:8800/showscores')
        //löydettty data asetetaan listaan
        setScoreData(res.data)
        

    }

    return(
        <div>
            <button class="btn btn-primary btn-sm" onClick={showScores}>Show scores</button>
            {scoreData.map(s => (
                <p>{s.name} {s.points}</p>
        
      ))}
  
        </div>
    )
} export default Scores;

