import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { createBooking} from '../../../store/booking';
import './BookingFormCreate.css'

const BookingFormCreate = ({spotId}) => {

    const dispatch = useDispatch();
    const history = useHistory();

//     "startDate": "2021-11-19",
// "endDate": "2021-11-20"

    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate,
            endDate
        }

        return dispatch(createBooking(payload,spotId))
        .then((booking) => history.push(`/bookings/${booking.id}`));
        
    }

    return (
        <div className="create-booking-form-container">
        <h1> Create a New Booking</h1>
        <form className="create-booking-form" onSubmit={onSubmit}>
            <label> Start Date
            <input className="booking-form-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}/>
            </label>
            <label> End Date
            <input className="booking-form-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}/>
            </label>
    
            <button className="submit-button"> Create Booking</button>
        </form>
        </div>
    )
};

export default BookingFormCreate;