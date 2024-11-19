
import './App.css';
import WordInput from "./pages/WordInput"
import axios from "axios"
import learnHeader from "./images/learnHeader.jpg"
import { useState, useEffect } from 'react';

function App() {
  const [startLearn, setStartLearn] = useState(false)
  const [question, setQuestion] = useState([])
  const [questionId, setQuestionId] = useState(1)
  const [table,setTable]=useState("")
  const handleClick = async () => {
    setStartLearn(!startLearn)
    const res = await axios.get("http://localhost:8800/question/"+questionId)
    setQuestion(res.data)


  }
  const tableClick = async () => {
    const res = await axios.get('http://localhost:8800/tablename/'+table,{questionId})
    console.log(res.data)
  }
  return (
    <div className="App">
      <img src={learnHeader}></img>
      <br></br>
     {/*w-25 muuttaa leveyden 25 prosenttiin*/}
      <select class="form-select form-select-sm w-25" onChange={e=>setTable(e.target.value)} aria-label=".form-select-sm example">
        <option selected >Select language</option>
        {console.log(table)}
        <option value="questions">Finnish</option>
        <option value="questionswe">Swedish</option>
        <option value="3">Three</option>
      </select>
     
      <button onClick={tableClick}>test</button>
      <input class="startLearnCB" type="checkbox" id="startLearn" onChange={handleClick} />
      <label class="startLearnLbl" for="startLearnCB">Start learning</label>
      <br></br>
      <h2 className='lngHeader'>Languages</h2>
      <br></br>
      {question.map(q => (
        <center>
          <p id='question' className='question'><b>{q.ask}</b></p>
        </center>
      ))}



      <br></br>
      {/*jos starlearn on true eli checkboksia on klikattu näytetään wordinput komponentti
      samalla lähetetään wordinput komponentille näytettävä kysymys*/}
      {startLearn && <WordInput question={question} setQuestionId={setQuestionId} questionId={questionId} setQuestion={setQuestion} />}

    </div>
  );
}

export default App;
