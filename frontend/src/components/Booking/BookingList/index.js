import { useDispatch } from "react-redux";
import BookingListItem from "./BookingListItem";
import { fetchUserBookings } from "../../../store/booking";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BookingList = () => {

    const dispatch = useDispatch();
    const bookings = useSelector(state => state.booking);
    const currentUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        dispatch(fetchUserBookings());
    },[dispatch]);

    return (
         <>
        { 
        bookings.map(booking => {

            return <BookingListItem booking={booking}/>

        })

        }
        </>


    );

}

export default BookingList;