import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState , useEffect} from "react";
import { fetchUserBookings , removeBooking, updateBooking} from "../../../store/booking";
import { NavLink } from "react-router-dom";

const BookingFormEdit = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    const booking = useSelector(state=> state.booking.booking);
    const[isLoaded,setIsLoaded] = useState(false);

    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');

    useEffect(()=>{
    
        dispatch(fetchUserBookings()).then((bookings)=> {
        
            const foundBooking = bookings.Bookings.find(booking => currentUser.id === booking.userId);
            if(foundBooking){
                const startDateObj = new Date();
                 startDateObj.setTime(Date.parse(foundBooking.startDate));
                const endDateObj = new Date();
                 endDateObj.setTime(Date.parse(foundBooking.endDate));
                // console.log('foundbooking: ', Date.parsefoundBooking);
                setIsLoaded(true);
                setStartDate(`${startDateObj.getFullYear()}-${startDateObj.getMonth()}-${startDateObj.getDate()}` );
                setEndDate(`${endDateObj.getFullYear()}-${endDateObj.getMonth()}-${endDateObj.getDate()}` );
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
        .then((res) => history.push(`/bookings/${id}`));
    }

    const handleDelete = (e) => {
        e.preventDefault();
      
        return dispatch(removeBooking(id))
          .then(() => history.push(`/users/${currentUser.id}/bookings`));
    }

    return (
        <>
        {!isLoaded && 
        (<p> Sorry, you don't have permission to edit this.</p>)
        }
        <div>
            {isLoaded && 
            (
            <div className="booking-container">
            <h1> Booking</h1>
            <form className="edit-booking-form" onSubmit={handleSubmit}>
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
            <div className="booking-detail-actions">
            {isLoaded &&
            (
            <>
            <NavLink className="booking-item-edit" to={`/bookings/${id}/edit`}> Edit </NavLink> 
            <NavLink onClick={handleDelete} className="booking-item-delete" to={`/bookings/${id}`}> Delete </NavLink>  
            <br/>
            </>
            )   
        }  
            </div>
        </div>
        </>
    );

}

export default BookingFormEdit;