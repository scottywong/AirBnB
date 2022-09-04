import { useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { fetchSpotById} from "../../../store/spot";
import { useEffect , useState} from "react";
import { NavLink } from "react-router-dom";
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
                if(currentUser.id === spot.ownerId) setIsLoaded(true);
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
                <p><b>{name}</b></p>
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
              <NavLink className="spot-item-edit" to={`/spots/${id}/edit`}> Edit </NavLink> 
              <NavLink onClick={handleDelete} className="spot-item-delete" to={`/spots/${id}`}> Delete </NavLink>  
              <br/>
              </>
              )   
          }  
          </div>

        </div>
        {!isLoaded &&
        (<BookingFormCreate spotId={id} />)
        }
        </>
    );
};

export default SpotDetail;