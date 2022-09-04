import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Calendar = () => {

    // const day = 60 * 60 * 24 * 1000;
    // const timestampToday = Date.now() - (Date.now() % day) + (new Date().getTimezoneOffset() * 1000 * 60);

    const [showCalendar, setShowCalendar] = useState(false);


    // const addBackDrop =(e)=> {

    //     const calendarOnPage = document.getElementsByClassName("calendar");
        
    //     // if(showDatePicker && !ReactDOM.findDOMNode(this).contains(e.target)) {
    //     //     setShowCalendar(false);
    //     // }
    // }

    // useEffect(()=> {

    //     window.addEventListener('click', addBackDrop);

    //     return  window.removeEventListener('click', addBackDrop);
    // },[]);


    return (
        <div className='calendar'>
            <div className='calendar-input' >
                <input type='date'/>
            </div>
            {showCalendar &&  (
                <div className='calendar-container'> 
                </div>
            )}
        </div>
    );

}

export default Calendar;