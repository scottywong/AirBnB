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
    const [errors,setErrors] = useState([]);

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
        .catch(async (res) => {
            const data = await res.json();
            console.log('data: ', data.errors);
            if (data && data.errors) setErrors(data.errors);
          }).then((res) => 
          {if(!errors){
                history.push(`/bookings/${id}`);
            }
          });
    }

    const handleDelete = (e) => {
        e.preventDefault();
      
        return dispatch(removeBooking(id))
        .catch(async (res) => {
            const data = await res.json();
            console.log('data: 1 ', data.errors);
            if (data && data.errors) setErrors(data.errors);
            console.log(errors)
          }).then(() => {if(!errors) history.push(`/users/${currentUser.id}/bookings`)});
    }

    return (
        <>
        <div className="booking-edit-container">
        <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
       </ul>
            {isLoaded && 
            (
            <div className="booking-edit">
            <h1> Booking</h1>
                <form className="edit-booking-form" onSubmit={handleSubmit}>
                    <label> Name
                        <input type='text' readOnly value={name}/>
                    </label>
                    <label> Start Date
                        <input
                        type='date'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        ></input>
                    </label>
                    <label> End Date
                        <input
                        type='date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        ></input>
                    </label>

                    <button className="submit-button"> Submit Changes </button>
                </form>
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