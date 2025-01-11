import { useState } from "react"
import axios from "axios"
function Scores() {
    var [scoreData, setScoreData] = useState([])
    const [scoreDiv,setScoreDiv]=useState(true)

    const showScores = async () => {
        setScoreDiv(!scoreDiv)
        //suoritetaan endpointissa oleva funktio
        const res = await axios.get('http://localhost:8800/showscores')
        //löydettty data asetetaan listaan
        setScoreData(res.data)


    }

    return (
        <div>
            <button class="btn btn-primary btn-sm" onClick={showScores}>Show scores</button>
            {scoreData.map(s => (
                <ul hidden={scoreDiv}>
                    <li style={{ background: "lightgray", width: '5%', position: 'relative', left: '595px', borderRadius: '5px' }}>{s.name} {s.points}</li>
                </ul>
            ))}

        </div>
    )
} export default Scores;

