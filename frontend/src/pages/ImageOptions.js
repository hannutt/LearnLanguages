import '../App.css'
import { useState } from 'react'
function ImageOptions(props) {
    var [grayImage, setGrayImage] = useState('')
    var [cssValue, setCssValue] = useState(100)
    const [brigh,setBrigh]=useState(false)
    var  [makeGray,setMakeGray]=useState(false)
    const [adjustConst,setAdjustConst]=useState(false)
    var [cssText,setCssText]=useState("")
    var [disableRange,setDisableRange]=useState(true)

  //sliderin kontrollointi ja kuvan kirkkauden/kontrastin säätö valinnan mukaan
    const sliderMove = () => {
        var slid = document.getElementById("rng")
        document.getElementById("sliderVal").innerText = slid.value
        if (adjustConst)
        { 
            setCssText(cssText="contrast")
            setCssValue(cssValue = slid.value)
        }

        if (brigh){
            
            setCssText(cssText="brightness")
            setCssValue(cssValue = slid.value)
        }
    }

    return (
        <div>
            <p id='question' hidden={props.hideImage} className='question'><b>{props.q.ask} </b></p>
            <div id='helper' className={props.animateDiv}>
                {/*ehdollinen renderöinti jos makegray on true renderöidään ? merkin jälkeinen komponentti muuten : jälkeinen*/}
                {makeGray ? <img className={grayImage} hidden={props.helperImg} src={props.q.imageurl} alt='helper' width={200} height={200}></img>: <img className={grayImage} style={{ filter: cssText+"("+cssValue+"%"+")" }} hidden={props.helperImg} src={props.q.imageurl} alt='helper' width={200} height={200}></img>}
               
            </div>
            <span className='hideImgSpan'>
                <div className='imgCB'>
                <input class="form-check-input" type="checkbox" id="hideImageCB" onChange={() => props.setHelperImg(!props.helperImg)} />
                <label class="form-check-label" for="hideImageCB">Hide image</label>
                </div>
                
                 <div className='imgCB'> 
                <input class="form-check-input" type="checkbox" id="brightImageCB" onChange={()=>{setBrigh(!brigh);setDisableRange(!disableRange)}} />
                <label class="form-check-label" for="adjustImageCB">Adjust brightness</label>
                </div>
                
                <div className='imgCB'>
                <input class="form-check-input" type="checkbox" id="adjustImageCB" onChange={()=>{setAdjustConst(!adjustConst);setDisableRange(!disableRange)}} />
                <label class="form-check-label" for="adjustImageCB">Adjust contrast</label>
                </div>
            </span>
            <div>
                <input type="range" disabled={disableRange} defaultValue="100" min="1" max="200" step={1} class="slider" id="rng" onInput={sliderMove} />
                <p id='sliderVal'></p>
            </div>
        </div>
    )
}
export default ImageOptions;