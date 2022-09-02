import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserBookings } from "../../../store/booking";

import './BookingDetail.css';

const BookingDetail = () => {

    const dispatch = useDispatch();
    const {id} = useParams();

    const [isLoaded,setIsLoaded] = useState(false);
    const [startDate,setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const currentUser = useSelector(state=> state.session.user);

    useEffect(()=> {

        dispatch(fetchUserBookings()).then((bookings)=> {
           
            const foundBooking = bookings.Bookings.find(booking => currentUser.id === booking.userId);
        
            if(foundBooking){
                setIsLoaded(true);
                setStartDate(foundBooking.startDate);
                setEndDate(foundBooking.endDate);
            }
        });
    },[dispatch]);
    
    
    return(
        <>
        {!isLoaded && 
        (<p> Sorry, you don't have permission to view this</p>)
        }
        <div>
            {isLoaded && 
            (
            <div className="booking-container">
            <h1> Booking</h1>
            <p>{id}</p>
            <p>{startDate}</p>
            <p>{endDate}</p>
            </div>
            )
            }
        </div>
        </>
    )
}

export default BookingDetail;
