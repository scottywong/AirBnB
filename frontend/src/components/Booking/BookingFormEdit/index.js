import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState , useEffect} from "react";
import { fetchUserBookings , removeBooking, updateBooking} from "../../../store/booking";
import { NavLink } from "react-router-dom";
import './BookingFormEdit.css';

const BookingFormEdit = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    const booking = useSelector(state=> state.booking.booking);
    const[isLoaded,setIsLoaded] = useState('');

    const [name,setName] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(()=>{
    
        dispatch(fetchUserBookings()).then((bookings)=> {
        
            console.log('bookings after fetch: ', bookings);
            const foundBooking = bookings.find(booking => booking.id === parseInt(id));
            console.log('foundBooking: ', foundBooking);

            if(foundBooking){
                
                setIsLoaded(true);
                setName(foundBooking.Spot.name);
                setStartDate(foundBooking.startDate);
                setEndDate(foundBooking.endDate);
  
            } else {
                setIsLoaded(false);
            }
        })
    },[dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            startDate,
            endDate
        };

        return dispatch(updateBooking(payload,id))
        .then((res) => history.push(`/bookings/${id}`))
        .catch(async (res) => {
            const data = await res.json();
            console.log('data to delete from booking edit: ', data);
            if (data && data.errors) setErrors(data.errors)
          });
    }

    const handleDelete = (e) => {
        e.preventDefault();
      
        return dispatch(removeBooking(id))
          .then(() => history.push(`/users/${currentUser.id}/bookings`));
    }

    return (
        <>

        <div className="booking-edit-container">
       
            {isLoaded && 
            (
            <div className="booking-edit">
            <h1> Booking</h1>
            <ul className="errorMsg"> 
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
                <form className="edit-booking-form" onSubmit={handleSubmit}>
                    <label> Name </label>
                    <input type='text' readOnly value={name}/>
                    <label> Start Date</label>
                    <input
                        type='date'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label> End Date </label>
                    <input
                        type='date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </form>
                <button onClick={handleSubmit} className="submit-button"> Submit Changes </button>
            </div>
            )
            }
            <div className="booking-edit-actions">
            {isLoaded &&
            (
            <>
            <button onClick={handleDelete} className="booking-item-delete" to={`/bookings/${id}`}> Delete </button>  
            <button onClick={()=> history.push(`/bookings/${id}`)} className="booking-item-cancel"> Cancel </button>  
            </>
            )   
        }  
            </div>
        </div>
        {isLoaded===false && 
        (<p> Sorry, you don't have permission to edit this.</p>)
        }
        </>
    );

}

export default BookingFormEdit;