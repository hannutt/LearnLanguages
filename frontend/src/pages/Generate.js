import { useState } from "react"
import '../App.css'

function Generate() {

    var [genQuote, setGenQuote] = useState('')
    var [quoteInFin, setQuoteInFin] = useState('')
    var [transQuote,setTransQuote]=useState(true)

    const generateQuote = () => {
        setTransQuote(!transQuote)
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
            
            </center>
            
            
            <br></br>
            <input type="text" id="answer" placeholder="Your translation"></input>
            <button class="btn btn-success btn-sm" onClick={checkAnswer}>Check</button>
        </div>
    )
}
export default Generate