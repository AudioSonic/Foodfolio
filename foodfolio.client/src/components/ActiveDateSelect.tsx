import "./ActiveDateSelect.css"
import Calendar from "../assets/icons/icon_calendar_month.svg"

type ActiveDateSelectProps = {
    date: Date;
    onChangeDate: (offset: number) => void;
};

function ActiveDateSelect({ date, onChangeDate }: ActiveDateSelectProps){
    const formattedDate = new Intl.DateTimeFormat("de-DE", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(date);

    return(
        <div id="active-date-select">
            <button className="btn change-date-button" type="button" onClick={() => onChangeDate(-1)}>‹</button>
            <div id="active-date">
            <img src={Calendar}/>
            <span>{formattedDate}</span>
            </div>
            <button className="btn change-date-button" type="button" onClick={() => onChangeDate(1)}>›</button>
        </div>
    )
}

export default ActiveDateSelect
