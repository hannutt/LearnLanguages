import logo from './logo.svg';
import './App.css';
import WordInput from "./pages/WordInput"
import axios from "axios"
import learnHeader from "./images/learnHeader.jpg"
import { useState, useEffect } from 'react';

function App() {
  const [startLearn, setStartLearn] = useState(false)
  const [question, setQuestion] = useState([])
  const [questionId, setQuestionId] = useState(1)
  const handleClick = async () => {
    setStartLearn(!startLearn)
    const res = await axios.get("http://localhost:8800/question/" + questionId)
    setQuestion(res.data)


  }
  return (
    <div className="App">
      <img src={learnHeader}></img>
      <h3 className='lngHeader'>Languages</h3>
     
      {question.map(q => (
        <p id='question'><b>{q.ask}</b></p>
      ))}


      <input class="startLearnCB" type="checkbox" id="startLearn" onChange={handleClick} />
      <label class="startLearnLbl" for="startLearnCB">Start learning</label>

      <br></br>
      {/*jos starlearn on true eli checkboksia on klikattu näytetään wordinput komponentti
      samalla lähetetään wordinput komponentille näytettävä kysymys*/}
      {startLearn && <WordInput question={question} setQuestionId={setQuestionId} questionId={questionId} setQuestion={setQuestion} />}

    </div>
  );
}

export default App;
