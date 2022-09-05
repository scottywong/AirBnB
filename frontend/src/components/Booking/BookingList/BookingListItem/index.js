import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBooking, updateBooking } from "../../../../store/booking";
import { useHistory } from "react-router-dom";
import './BookingListItem.css';


const BookingListItem = ({booking}) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state=> state.session.user);

    const [isLoaded,setIsLoaded] = useState(false);
    const [showSubmit,setShowSubmit] = useState(false);
    const [name,setName] = useState(booking.Spot.name);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');

    useEffect(()=> {
        if(currentUser && currentUser.id === booking.userId) setIsLoaded(true);        
        setStartDate(booking.startDate);
        setEndDate(booking.endDate);

    },[booking]);

    const handleClick = () => {

       document.getElementById(`startDate-input-${booking.id}`).readOnly = false;
       document.getElementById(`endDate-input-${booking.id}`).readOnly = false;
       setShowSubmit(true);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            startDate,
            endDate
        };

        return dispatch(updateBooking(payload,booking.id))
        .then((res) => {
            document.getElementById(`startDate-input-${booking.id}`).readOnly = false;
            document.getElementById(`endDate-input-${booking.id}`).readOnly = false;
            setShowSubmit(false);
        }
       );
    }

    const handleDelete = (e) => {

        e.preventDefault();
        return dispatch(removeBooking(booking.id));
    }

    return (
        <div className="booking-item-container">        
            <div className="booking-item-detail">
                <form className="edit-booking-form" onSubmit={handleSubmit}>
                    <label> Name
                        <input type='text' readOnly value={name}/>
                    </label>
                    <label> Start Date
                        <input
                        id={`startDate-input-${booking.id}`}
                        type='date'
                        value={startDate}
                        readOnly
                        onChange={(e) => setStartDate(e.target.value)}
                        ></input>
                    </label>
                    <label> End Date
                        <input
                        id={`endDate-input-${booking.id}`}
                        type='date'
                        value={endDate}
                        readOnly
                        onChange={(e) => setEndDate(e.target.value)}
                        ></input>
                    </label>
                    {showSubmit &&
                    <button id={`submit-button-${booking.id}`}> Submit Changes </button>
                    }
                </form>
            </div>

            <div className="booking-item-actions">

            {isLoaded &&
                (
                <>
                <button className="booking-item-edit" onClick={handleClick}> Edit </button> 
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