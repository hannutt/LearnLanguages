import { useState,useEffect } from "react"

function PlayerReset() {
    var [hideReset,setHideReset]=useState(false)

    const checkLocalStorage=()=>{
        if (localStorage.getItem("id") === null) {
            setHideReset(hideReset=true)
        }
    }
    useEffect(()=>{
        checkLocalStorage()
        }, [])

    const DoReset=()=>{
        localStorage.removeItem("id")
        localStorage.removeItem("player")
        localStorage.removeItem("table")

    }
    return(
        <div>
            <button onClick={DoReset} hidden={hideReset} class="btn btn-primary btn-sm">Reset</button>
        </div>
    )
} export default PlayerReset;