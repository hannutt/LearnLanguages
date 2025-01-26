import { useRef, useState } from "react"
import words from '../pages/words.json'
import '../App.css'
function DragnDrop(props) {
    var [wCount, setWcount] = useState(1)
    const allowDrop = (e) => {
        e.preventDefault()
    }

    //e-parametri on raahauseventti, l on raahattavan painikkikeen kirjain
    const dStart = (e, l) => {
       
        e.dataTransfer.setData("text/plain", l)
    }
    const drop = (e) => {
        const data = e.dataTransfer.getData("text/plain")
        document.getElementById("dropInput").value += data

    }

    const checkDnD = () => {

        setWcount(wCount + 1)
    }
    return (
        <div>
            <p className="infoText">Choose the correct word for the answer to the word</p>
            {words.map(w => (
                <div>
                    {/*näytetään id-numeroa vastaava w.en property*/}
                    <center>
                        <p className="showWord">{w.id == wCount && w.en}</p>
                    </center>
                    
                    <div class="btncontainer">
                        {/*userselectin arvosta riippuen json tiedostosta haetaan joko suomen tai ruotsinkielisiä sanoja*/}
                    {props.userSelect === "Finnish" && <button class="btn btn-warning btn-sm" draggable onDragStart={(e) => dStart(e, w.fi)}>{w.fi}</button>}
                    {props.userSelect === "Swedish" && <button class="btn btn-warning btn-sm" draggable onDragStart={(e) => dStart(e, w.sv)}>{w.sv}</button>}
                        
                    </div>
                </div>
            ))}

            <div>
                <br></br>
                <input type="text" id="dropInput" onDragOver={allowDrop} onDrop={drop}></input>
                <button class="btn btn-info btn-sm" onClick={checkDnD} >Check answer</button>
            </div>
        </div>

    )

} export default DragnDrop