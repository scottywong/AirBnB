import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchUserBookings, removeBooking } from "../../../store/booking";
import './BookingDetail.css';

const BookingDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const [isLoaded,setIsLoaded] = useState('');
    const [name,setName] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const currentUser = useSelector(state=> state.session.user);

    useEffect(()=> {

        dispatch(fetchUserBookings()).then((bookings)=> {
            console.log('bookings after fetch: ', bookings);
            const foundBooking = bookings.find(booking => booking.id === parseInt(id));
            console.log('foundBooking: ', foundBooking);
            const startDateObj = new Date();
            const endDateObj = new Date();
            
            if(foundBooking){
                startDateObj.setTime(Date.parse(foundBooking.startDate));
                endDateObj.setTime(Date.parse(foundBooking.endDate));
                setIsLoaded(true);
                setName(foundBooking.Spot.name);
                setStartDate(startDateObj.toISOString().split('T')[0]);
                setEndDate(endDateObj.toISOString().split('T')[0]);
            } else {
                setIsLoaded(false);
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

        <div className="booking-container">
            {isLoaded && 
            (
            <div className="booking-detail">
                <h1> Booking</h1>
                <label> Name: 
                    <input type='text' readOnly value={name}/>
                </label>
                <label> Start Date:  
                    <input type='date' readOnly value={startDate}/>
                </label>
                <label> End Date: 
                    <input type='date' readOnly value={endDate}/>
                </label>
                <br/>
            </div>
        
            )
            }
            <div className="booking-list-actions">
            {isLoaded &&
                (
                <>
                <button className="booking-item-edit" onClick={()=> history.push(`/bookings/${id}/edit`)}> Edit </button> 
                <button onClick={handleDelete} className="booking-item-delete" to={`/bookings/${id}`}> Delete </button>  
                <br/>
                
                </>
                )   
            }  
            </div>
        </div>

        {isLoaded===false && 
        (<p> Sorry, you don't have permission to view this</p>)
        }
        </>
    )
}

export default BookingDetail;
