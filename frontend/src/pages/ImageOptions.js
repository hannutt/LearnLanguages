import '../App.css'
import { useState } from 'react'

function ImageOptions(props) {
    var [grayImage, setGrayImage] = useState('')
    var [cssValue, setCssValue] = useState(100)
    const [brigh, setBrigh] = useState(false)
    var [makeGray, setMakeGray] = useState(false)
    const [adjustConst, setAdjustConst] = useState(false)
    var [cssText, setCssText] = useState("")
    var [disableRange, setDisableRange] = useState(true)
    var [imgWidth, setImgWidth] = useState(200)
    var [imgHeight, setImgHeight] = useState(200)
    const [adjustHue,SetAdjustHue]=useState(false)
    var [ext,setExt]=useState('')
    
    //sliderin kontrollointi ja kuvan kirkkauden/kontrastin säätö valinnan mukaan
    const sliderMove = () => {
        var slid = document.getElementById("rng")
        document.getElementById("sliderVal").innerText = slid.value
        if (adjustConst) {
            setCssText(cssText = "contrast")
            setCssValue(cssValue = slid.value)
            setExt(ext="%")
        }

        if (brigh) {

            setCssText(cssText = "brightness")
            setCssValue(cssValue = slid.value)
            setExt(ext="%")
        }
        if (adjustHue) {
            setCssText(cssText="hue-rotate")
            setCssValue(cssValue=slid.value)
            setExt(ext="deg")
        }
    }

    const decreaseImage = () => {
        setImgHeight(imgHeight -= 5)
        setImgWidth(imgWidth -= 5)

    }
    const increaseImage = () => {
        setImgHeight(imgHeight += 5)
        setImgWidth(imgWidth += 5)

    }

    const resetCssValues=()=>{
       
        
        if (adjustHue)
        {
            setCssValue(cssValue=0)
            document.getElementById("sliderVal").innerText = 0
        }
        else{
            document.getElementById("sliderVal").innerText = 100
            setCssValue(cssValue=100)
        }
        setImgHeight(imgHeight = 200)
        setImgWidth(imgWidth = 200)
    }

    return (
        <div>

            <p id='question' hidden={props.hideImage} className='question'><b>{props.q.ask} </b></p>
            <div id='helper' className={props.animateDiv} hidden={props.hideImage}>
                {/*ehdollinen renderöinti jos makegray on true renderöidään ? merkin jälkeinen komponentti muuten : jälkeinen*/}
                {makeGray ? <img className={grayImage} hidden={props.helperImg} src={props.q.imageurl} alt='helper' width={imgWidth} height={imgHeight}></img> : <img className={grayImage} style={{ filter: cssText + "(" + cssValue + ext + ")" }} hidden={props.helperImg} src={props.q.imageurl} alt='helper' width={imgWidth} height={imgHeight}></img>}

            </div>
            <span className='hideImgSpan' hidden={props.hideImage}>
                <div className='imgCB' >
                    <h3>Adjust image</h3>
                    <input class="form-check-input" type="checkbox" id="hideImageCB" onChange={() => props.setHelperImg(!props.helperImg)} />
                    <label class="form-check-label" for="hideImageCB">Hide image</label>
                </div>

                <div className='imgCB'>
                    <input class="form-check-input" type="checkbox" id="brightImageCB" onChange={() => { setBrigh(!brigh); setDisableRange(!disableRange) }} />
                    <label class="form-check-label" for="adjustImageCB">Adjust brightness</label>
                </div>

                <div className='imgCB'>
                    <input class="form-check-input" type="checkbox" id="adjustImageCB" onChange={() => { setAdjustConst(!adjustConst); setDisableRange(!disableRange) }} />
                    <label class="form-check-label" for="adjustImageCB">Adjust contrast</label>
                </div>
                <div className='imgCB'>
                    <input class="form-check-input" type="checkbox" id="adjustHueRotateCB" onChange={() => { SetAdjustHue(!adjustHue); setDisableRange(!disableRange) }} />
                    <label class="form-check-label" for="adjustHueRotateCB">Adjust Hue Rotate</label>
                </div>

                <div hidden={props.hideImage}>
                    <br></br>
                    <input type="range" disabled={disableRange} defaultValue="100" min="1" max="200" step={1} class="slider" id="rng" onInput={sliderMove} />
                    <p id='sliderVal'></p>
                    <br></br>
                    <span className='imgButtons'>
                        <button class="btn btn-primary btn-sm" onClick={decreaseImage}>-</button> <button class="btn btn-info btn-sm" onClick={increaseImage}>+</button><button style={{ marginLeft: '5px' }} class="btn btn-warning" onClick={resetCssValues}>R</button>
                    </span>
                </div>
            </span>
        </div>
    )
}
export default ImageOptions;