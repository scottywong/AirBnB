import { useEffect } from "react";
import { useDispatch } from "react-redux";

const BookingListItem = ({booking}) => {

    const dispatch = useDispatch();
    // useEffect(() =>{

    //     dispatch(fetchBookingById(booking.id));

    // });

    return (
        <>
            <p>{booking.id}</p>
            <p>{booking.name}</p>
        </>
    )
}

export default BookingListItem;