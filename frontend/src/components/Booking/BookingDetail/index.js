import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchUserBookings, removeBooking } from "../../../store/booking";
import { NavLink } from "react-router-dom";
import Calendar from "../../Calendar";
import './BookingDetail.css';

const BookingDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const [isLoaded,setIsLoaded] = useState(false);
    const [startDate,setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const currentUser = useSelector(state=> state.session.user);

    useEffect(()=> {

        dispatch(fetchUserBookings()).then((bookings)=> {
           
            const foundBooking = bookings.Bookings.find(booking => parseInt(id) === booking.id);

            const startDateObj = new Date();
            startDateObj.setTime(Date.parse(foundBooking.startDate));
           const endDateObj = new Date();
            endDateObj.setTime(Date.parse(foundBooking.endDate));
            
            if(foundBooking){
                setIsLoaded(true);
                setStartDate(`${startDateObj.getFullYear()}-${startDateObj.getMonth()}-${startDateObj.getDate()}`);
                setEndDate(`${endDateObj.getFullYear()}-${endDateObj.getMonth()}-${endDateObj.getDate()}`);
            }
        });
    },[dispatch]);

    const handleDelete = (e) => {
        e.preventDefault();
      
        return dispatch(removeBooking(id))
          .then(() => history.push(`/users/${currentUser.id}/bookings`));
    }
    
    
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
            <input type='date' value={startDate}></input>
            <p>{endDate}</p>
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
    )
}

export default BookingDetail;
