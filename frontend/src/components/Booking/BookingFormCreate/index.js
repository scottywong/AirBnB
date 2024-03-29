import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { createBooking} from '../../../store/booking';
import './BookingFormCreate.css'

const BookingFormCreate = ({spotId}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate,
            endDate
        }

        return dispatch(createBooking(payload,spotId))
        .then((booking) => history.push(`/bookings/${booking.id}`))
        .catch(async (res) => {
            const data = await res.json();
            console.log('data to delete from booking create: ', data);
            if (data && data.errors) setErrors(data.errors)
          })
        
    }

    return (
        <div className="create-booking-form-container">
        <h1> Create a New Booking</h1>
        <ul className="errorMsg">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <form className="create-booking-form" onSubmit={onSubmit}>
            <label> CHECK-IN</label>
            <input type='date' className="booking-form-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}/>
            
            <label> CHECKOUT</label>
            <input type='date' className="booking-form-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}/>
            
            
        </form>
        <button onClick={onSubmit}className="submit-button-booking"> Reserve</button>
        </div>
    )
};

export default BookingFormCreate;