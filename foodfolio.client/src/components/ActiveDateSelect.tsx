import "./ActiveDateSelect.css"
import Calendar from "../assets/icons/icon_calendar_month.svg"

function ActiveDateSelect(){
    return(
        <div id="active-date-select">
            <button className="btn change-date-button">‹</button>
            <div id="active-date">
            <img src={Calendar}/>
            <span>Montag, 18. August 2025</span>
            </div>
            <button className="btn change-date-button">›</button>
        </div>
    )
}

export default ActiveDateSelect