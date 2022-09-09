import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBooking, updateBooking } from "../../../../store/booking";
import { NavLink } from "react-router-dom";
import './BookingListItem.css';


const BookingListItem = ({booking}) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state=> state.session.user);

    const [isLoaded,setIsLoaded] = useState(false);
    const [showSubmit,setShowSubmit] = useState(false);
    const [name,setName] = useState(booking.Spot.name);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [errors,setErrors] = useState([]);

    useEffect(()=> {
        if(currentUser && currentUser.id === booking.userId) setIsLoaded(true);        
        setStartDate(booking.startDate);
        setEndDate(booking.endDate);

    },[booking]);

    
    const handleEdit = () => {

       document.getElementById(`startDate-input-${booking.id}`).readOnly = false;
       document.getElementById(`endDate-input-${booking.id}`).readOnly = false;
    //    document.getElementById(`startDate-input-${booking.id}`).style.border = '';
    //    document.getElementById(`endDate-input-${booking.id}`).style.border = '';
       setShowSubmit(true);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            startDate,
            endDate
        };

        return dispatch(updateBooking(payload,booking.id))
        .then((res) => {
            document.getElementById(`startDate-input-${booking.id}`).readOnly = false;
            document.getElementById(`endDate-input-${booking.id}`).readOnly = false;
            // document.getElementById(`startDate-input-${booking.id}`).style.border = 'none';
            // document.getElementById(`endDate-input-${booking.id}`).style.border = 'none';
            setShowSubmit(false);
        }).catch(async (res) => {
            const data = await res.json();
            console.log('data to delete from booking list item: ', data);
            if (data && data.errors) setErrors(data.errors);
          });
    }

   
    const handleCancel = () => {

        document.getElementById(`startDate-input-${booking.id}`).readOnly = true;
        document.getElementById(`endDate-input-${booking.id}`).readOnly = true;
        // document.getElementById(`startDate-input-${booking.id}`).style.border = 'none';
        // document.getElementById(`endDate-input-${booking.id}`).style.border = 'none';
        setShowSubmit(false);
        setErrors([]);
 
    };

    const handleDelete = (e) => {

        e.preventDefault();
        return dispatch(removeBooking(booking.id))
        .catch(async (res) => {
            const data = await res.json();
            console.log('data to delete from booking list item: ', data);
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        
        <div className="booking-item-container">   
          <ul className="errorMsg"> 
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>     
          
          <NavLink to={`/bookings/${booking.id}`}>{name}</NavLink>
          <br/>
            <div className="booking-item-detail">
           
                <form className="edit-booking-form" onSubmit={handleSubmit}>
                    
                    {/* <label> Name </label> 
                    <input type='text' readOnly value={name}/> */}
                    <label> Start Date </label>
                    <input
                        id={`startDate-input-${booking.id}`}
                        type='date'
                        value={startDate}
                        readOnly
                        onChange={(e) => setStartDate(e.target.value)}
                       />
                    <label> End Date </label>
                    <input
                        id={`endDate-input-${booking.id}`}
                        type='date'
                        value={endDate}
                        readOnly
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </form>
            </div>
            {showSubmit &&
            <div className="booking-item-edit-actions">
                <button onClick={handleSubmit} className="submit-button-booking-item" id={`submit-button-${booking.id}`}> Submit </button>  
                <button onClick={handleCancel}> Cancel </button>    
            </div>               
                }
          <div className="booking-item-actions">

            {isLoaded &&
                (
                <>
                <button className="booking-item-edit" onClick={handleEdit}> Edit </button> 
                <button onClick={handleDelete} className="booking-item-delete" to={`/users/${currentUser?.id}/bookings`}> Delete </button>  
                <br/>
                </>
                )   
            }  
            </div>
        </div>

    );
}

export default BookingListItem;