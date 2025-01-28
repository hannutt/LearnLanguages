import { Chart } from "react-google-charts";
import { useState } from "react";

function ScoreBoard(props) {
    var [cType, setCtype] = useState("")
    //ev parametri sisältää checkboxin value propertyn ctype on charttype eli kaavion tyyppi
    const dataVisualization = (ev) => {
        props.setVisualization(!props.visualization)
        setCtype(cType = ev)

    }
    return (
        <div>
            
            <div className="answers">
                <h5 className="correct">Correct answers: {props.correctAns}</h5>
                <h5 className="wrong">Wrong answers: {props.wrongAns}</h5>
            </div>
            <div className="visualDiv">
                {/*datavisualization funktio saa onchangessa parametrina checkboksin valuen eli Gauge */}
                <input class="form-check-input" type="checkbox" id="visualCB" value="Gauge" onChange={e => dataVisualization(e.target.value)} />
                <label class="form-check-label" for="visualCB">Show data visualization in Cauge</label>
                <br></br>
                <input class="form-check-input" type="checkbox" id="visualCB2" value="PieChart" onChange={e => dataVisualization(e.target.value)} />
                <label class="form-check-label" for="visualCB2">Show data visualization in Pie Chart</label>
            </div>


            <center>
                {/*google chartin valinta gauge/piechart riippuen ctypen arvost*/}
                {props.visualization && cType === "Gauge" && <Chart
                    // google chart komponentti
                    chartType={cType}
                    data={[
                        ["Label", "Value"],
                        ["Wrong", props.wrongAns],
                        ["Correct", props.correctAns],


                    ]}

                />}
                {props.visualization && cType === "PieChart" && <Chart
                    // google chart komponentti
                    chartType={cType}
                    data={[
                        ["Answers", ""],
                        ["Correct", props.correctAns],
                        ["Wrong", props.wrongAns],

                    ]}
                />}
            </center>

        </div>
    )
}
export default ScoreBoard;