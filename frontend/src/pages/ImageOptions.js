import '../App.css'
import { useState } from 'react'
function ImageOptions(props) {
    var [grayImage, setGrayImage] = useState('')
    var [bright, setBright] = useState(100)
    var  [makeGray,setMakeGray]=useState(false)
    var clicks = 0

    const imgFilter = () => {
        setMakeGray(!makeGray)

        clicks += 1
        if (clicks % 1 === 0) {
            setGrayImage(grayImage = "grayImage")
        }
        if (clicks % 2 === 0) {
            setGrayImage(grayImage = "")
        }

    }
    const sliderMove = () => {

        var slid = document.getElementById("rng")
        document.getElementById("sliderVal").innerText = slid.value
        setBright(bright = slid.value)


    }

    return (
        <div>
            <p id='question' hidden={props.hideImage} className='question'><b>{props.q.ask} </b></p>
            <div id='helper' className={props.animateDiv}>
                {/*ehdollinen renderöinti jos makegray on true renderöidään ? merkin jälkeinen komponentti muuten : jälkeinen*/}
                {makeGray ? <img className={grayImage} hidden={props.helperImg} src={props.q.imageurl} alt='helper' width={200} height={200}></img>: <img className={grayImage} style={{ filter: `brightness(${bright}%)` }} hidden={props.helperImg} src={props.q.imageurl} alt='helper' width={200} height={200}></img>}
               
            </div>
            <span className='hideImgSpan'>

                <input class="form-check-input" type="checkbox" id="hideImageCB" onChange={() => props.setHelperImg(!props.helperImg)} />
                <label class="form-check-label" for="hideImageCB">Hide image</label>
                <br></br>
                <input class="form-check-input" type="checkbox" id="roundImageCB" onClick={imgFilter} />
                <label class="form-check-label" for="roundImageCB">Make image gray</label>
            </span>
            <div>
                <input type="range" defaultValue="100" min="1" max="200" step={1} class="slider" id="rng" onInput={sliderMove} />
                <p id='sliderVal'></p>
            </div>
        </div>
    )
}
export default ImageOptions;