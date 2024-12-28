
import hello from '../sounds/hello.mp3'
import dog from '../sounds/dog-barking.mp3'
function ListenSentences() {
   
var sentences=[hello,dog]
var i = 0
    const playVoice=()=>{
        
        var audio = new Audio(sentences[i])
        audio.play()
        i+=1
      

    }
    return(
        <div>
            <button onClick={playVoice}>Listen</button>
        </div>
    )

}
export default ListenSentences