import { useDispatch } from "react-redux";
import BookingListItem from "./BookingListItem";
import { fetchUserBookings } from "../../../store/booking";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import './BookingList.css';

const BookingList = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const bookings = useSelector(state => state.booking.booking);
    const currentUser = useSelector(state => state.session.user);

    console.log('inside bookings: ',bookings )
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        dispatch(fetchUserBookings());
    },[dispatch,currentUser]);

    if(!currentUser){
        history.push('/');
    };
    return (
        <div className="booking-list-container">
         <h1>Your Bookings</h1>
         <div className="booking-list">
            { bookings && 
            bookings.map(booking => {
                // console.log('booking: ', booking);
                return <BookingListItem booking={booking}/>
            })
            }
        </div>

            {!(bookings?.length) && (

                <p> No Bookings found.</p>
            )}
        </div>


    );

}

export default BookingList;