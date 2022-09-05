import { useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { fetchSpotById} from "../../../store/spot";
import { useEffect , useState} from "react";
import { removeSpot } from "../../../store/spot";
import { useHistory } from "react-router-dom";
import BookingFormCreate from '../../Booking/BookingFormCreate';
import './SpotDetail.css';

const SpotDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    let spots = useSelector(state=> state.spot.spot);

    const [isLoaded,setIsLoaded] = useState(false);
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state, setState] = useState('');
    const [country,setCountry] = useState('');
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');

    useEffect(()=> {
      dispatch(fetchSpotById(id))
        .then((spot)=> {
                if(currentUser && currentUser.id === spot.ownerId) setIsLoaded(true);
                setAddress(spot.address);
                setCity(spot.city);
                setState(spot.state);
                setCountry(spot.country);
                setName(spot.name);
                setPrice(spot.price);
      })
    },[dispatch]);
  
    const handleDelete = (e) => {

      e.preventDefault();
      
      return dispatch(removeSpot(id))
        .then(() => history.push(`/users/${currentUser.id}/spots`));
    }
  
    return (
      <>
        <div className="spot-detail-container">
          <div className="spot-detail">
            <>
                <h1>{name}</h1>
                <p>{address}</p>
                <p>{city}</p>
                <p>{state}</p>
                <p>{country}</p>
                <p>{price}</p>
             </>
          </div>
          <div className="spot-detail-actions">
          {isLoaded &&
              (
              <>
              <button className="spot-item-edit" onClick={()=>{history.push(`/spots/${id}/edit`)}}> Edit </button> 
              <button onClick={handleDelete} className="spot-item-delete"> Delete </button>  
              <br/>
              </>
              )   
          }  
          </div>

          {!isLoaded && currentUser &&
          (<BookingFormCreate spotId={id} />)
          }
          {
            !currentUser && (<p>You must be logged in to make a booking.</p>)
          }

        </div>
       
        </>
    );
};

export default SpotDetail;