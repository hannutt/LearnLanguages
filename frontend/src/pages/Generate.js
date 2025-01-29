import { useState } from "react"
import '../App.css'

function Generate() {

    var [genQuote, setGenQuote] = useState('')
    var [quoteInFin, setQuoteInFin] = useState('')
   
    var [txtColor,setTxtColor]=useState('')

    const generateQuote = () => {
       
        var apk = localStorage.getItem("quoteapk")
        var apiurl = "https://api.api-ninjas.com/v1/quotes"
        const requestOptions = {
            method: "GET",
            headers: { "X-Api-Key": apk },

        }

        fetch(apiurl, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //tulosjoukon quote property talletetaan state-muuttujaan.
                setGenQuote(genQuote = data[0].quote)
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
    }

    //quotePlace tagissa olevan tekstin fontin suurentaminen 2 pikselillä
    const increaseText=()=>{

        var txt = document.getElementById('quotePlace');
        var style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
        var currentSize = parseFloat(style);
        txt.style.fontSize = (currentSize + 2) + 'px';
        

    }

    const decreaseText=()=>{
        var txt = document.getElementById('quotePlace');
        var style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
        var currentSize = parseFloat(style);
        txt.style.fontSize = (currentSize - 2) + 'px';
    }
  

    const resetFontSize=()=>{
        var txt = document.getElementById('quotePlace');
        var style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
        txt.style.fontSize = (16) + 'px';
        txt.style.letterSpacing="Normal"

    }
    //col-parametri on väri, jonka on valittu select komponentissa.
    const changeTxtColor=(col)=>{
        var txt = document.getElementById('quotePlace');
        txt.style.color=col

    }

    const changeSpacing=(space)=>{
        
        var txt = document.getElementById('quotePlace');
        txt.style.letterSpacing=space+'px'
    }

    const checkAnswer = () => {
        genQuote = genQuote.toLowerCase()
        var apk = localStorage.getItem("apk")


        const API_URL = "https://api.openai.com/v1/chat/completions"
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apk}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "what is " + genQuote + " in finnish" }]
            })


        }
        fetch(API_URL, requestOptions).then(res => res.json()).then(async data => {
            var answer = data.choices[0].message.content
            var answerLower = answer.toLowerCase()
            setQuoteInFin(quoteInFin = answerLower)
            console.log(quoteInFin)
          
        }).catch((error) => {
            console.log(error)

        })
    }
    return (
        <div>
            <h3>Generate sentences</h3>
            <button class="btn btn-success btn-sm" onClick={generateQuote}>Generate</button>
            <br></br><br></br>
            <center>
            <p id="quotePlace" class="quotePlace">{genQuote}</p>
            <button class="btn btn-success btn-sm" style={{marginRight:10+'px'}} onClick={increaseText}>+</button>
            <button class="btn btn-danger btn-sm" style={{marginRight:10+'px'}} onClick={decreaseText}>-</button>
            <button class="btn btn-warning btn-sm" onClick={resetFontSize}>R</button>
            <br></br>
            <br></br>
            {/*lähetetään valittu väri changetextcolor funktiolle parametrina*/}
            <select id="textColor" className="textColor" onChange={e=>changeTxtColor(e.target.options[e.target.selectedIndex].text)}>
                <option selected>Change text color</option>
                <option>red</option>
                <option>white</option>
                <option>green</option>
                <option>black</option>
            </select>
            <select id="letterSpacing" className="letterSpacing" onChange={e=>changeSpacing(e.target.options[e.target.selectedIndex].text)}>
                <option selected>Change letter spacing</option>
                <option>2</option>
                <option>3</option>
               
            </select>
            </center>
            
            
            <br></br>
            <input type="text" id="answer" placeholder="Your translation"></input>
            <button class="btn btn-success btn-sm" onClick={checkAnswer}>Check</button>
        </div>
    )
}
export default Generate