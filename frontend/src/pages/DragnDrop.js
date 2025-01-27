import { useRef, useState } from "react"
import words from '../pages/words.json'
import '../App.css'
import ScoreBoard from "./ScoreBoard"

function DragnDrop(props) {
    var [wCount, setWcount] = useState(1)
    var [userInput, setUserInput] = useState('')
    var [dndFeedback, setDndFeedback] = useState('')
    const allowDrop = (e) => {
        e.preventDefault()
    }

    //e-parametri on raahauseventti, l on raahattavan painikkikeen tekstisältö
    const dStart = (e, l, qen) => {
        document.getElementById("sentence").innerText = qen

        e.dataTransfer.setData("text/plain", l)
    }
    const drop = (e) => {
        const dndData = e.dataTransfer.getData("text/plain")
        document.getElementById("dropInput").value += dndData.toLowerCase()
        setUserInput(userInput = dndData)

    }


    const answerCheck = () => {
      
        userInput = userInput.toLowerCase()
        var apk = localStorage.getItem("apk")
        var sent = document.getElementById("sentence").innerText

        const API_URL = "https://api.openai.com/v1/chat/completions"
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apk}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: sent }]
            })


        }
        fetch(API_URL, requestOptions).then(res => res.json()).then(async data => {
            var answer = data.choices[0].message.content
            var answerLower = answer.toLowerCase()
            console.log(answerLower)

            if (userInput === answerLower || answerLower.includes(userInput)) {
                setWcount(wCount + 1)
                setDndFeedback(dndFeedback = "CORRECT")


            }
        }).catch((error) => {
            console.log(error)

        })


    }
    return (

        <div>
            
            <h3>{dndFeedback}</h3>
            <p className="infoText">Choose the correct word for the answer to the word</p>
            {words.map(w => (
                <div>
                    {/*näytetään id-numeroa vastaava w.en property*/}
                    <center>
                        <p className="showWord">{w.id == wCount && w.en}</p>
                    </center>

                    <div class="btncontainer">
                        {/*userselectin arvosta riippuen json tiedostosta haetaan joko suomen tai ruotsinkielisiä sanoja*/}
                        {props.userSelect === "Finnish" && <button class="btn btn-warning btn-sm" draggable onDragStart={(e) => dStart(e, w.fi, w.qen)}>{w.fi}</button>}
                        {props.userSelect === "Swedish" && <button class="btn btn-warning btn-sm" draggable onDragStart={(e) => dStart(e, w.sv)}>{w.sv}</button>}

                    </div>
                </div>
            ))}

            <div>
                <br></br>
                <input type="text" id="dropInput" onDragOver={allowDrop} onDrop={drop}></input>

                <p hidden id="sentence"></p>
                <button class="btn btn-info btn-sm" onClick={answerCheck} >Check answer</button>
            </div>
        </div>

    )

} export default DragnDrop