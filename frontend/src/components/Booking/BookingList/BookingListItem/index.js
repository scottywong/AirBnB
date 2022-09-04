import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBooking } from "../../../../store/booking";
import { useHistory } from "react-router-dom";
import './BookingListItem.css';


const BookingListItem = ({booking}) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state=> state.session.user);
    const [isLoaded,setIsLoaded] = useState(false);
    const history = useHistory();

    const [name,setName] = useState(booking.Spot.name);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');

    useEffect(()=> {
        if(currentUser && currentUser.id === booking.userId) setIsLoaded(true);

        const startDateObj = new Date();
        const endDateObj = new Date();
            
        startDateObj.setTime(Date.parse(booking.startDate));
        endDateObj.setTime(Date.parse(booking.endDate));
        
        setStartDate(startDateObj.toISOString().split('T')[0]);
        setEndDate(endDateObj.toISOString().split('T')[0]);

    },[])

    const handleDelete = (e) => {

        e.preventDefault();
        return dispatch(removeBooking(booking.id));
    }

    return (
        <div className="booking-item-container">
            <div className="booking-item-detail" >
                <br/>
                <p><b>{booking.Spot.name}</b></p>
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>
            
            </div>

            <div className="booking-item-actions">

            {isLoaded &&
                (
                <>
                <button className="booking-item-edit" onClick={()=> history.push(`/bookings/${booking.id}/edit`)}> Edit </button> 
                <button onClick={handleDelete} className="booking-item-delete" to={`/users/${currentUser.id}/bookings`}> Delete </button>  
                <br/>
                </>
                )   
            }  
            </div>
        </div>

    );
}

export default BookingListItem;