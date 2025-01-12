import { useRef } from "react"
function DragnDrop() {
    const dragItem=useRef()
    var letters=['A','B','C','D']

    const dragStart=(e)=>{
        dragItem.current=e.target.id
    }
    return(
        <div>

        {letters.map(l => (
        <button draggable onDragStart={(e)=>dragStart(e)}>{l}</button>
      ))}
      </div>

    )

}export default DragnDrop