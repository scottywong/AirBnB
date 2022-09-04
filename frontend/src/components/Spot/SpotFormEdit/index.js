import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchSpotById, updateSpot} from "../../../store/spot";
import { useParams } from "react-router-dom";
import './SpotFormEdit.css';

const SpotFormEdit = () => {
 
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    const spot = useSelector(state=> state.spot.spot);
    const[isLoaded,setIsLoaded] = useState(false);
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state, setState] = useState('');
    const [country,setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(()=>{
        dispatch(fetchSpotById(id))
        .then((spot)=> {
                if(currentUser.id === spot.ownerId)setIsLoaded(true);
                    setAddress(spot.address);
                    setCity(spot.city);
                    setState(spot.state);
                    setCountry(spot.country);
                    setLat(spot.lat);
                    setLng(spot.lng);
                    setName(spot.name);
                    setDescription(spot.description);
                    setPrice(spot.price);
        });
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        return dispatch(updateSpot(payload,id))
        .then((res) => history.push(`/spots/${id}`));
        
    }

    return (
        <>

        {!isLoaded &&
          <p>  Sorry, but you don't have the right permissions to edit this. </p>
        }

        {isLoaded 
           &&
           (
            <div className="edit-spot-form-container">
            <h1> Edit Spot</h1>
            <form className="edit-spot-form" onSubmit={handleSubmit}>
                <label> Address
                <input className="spot-form-input"
                value={address}
                onChange={(e) => e.target.value}/>
                </label>
                <label> City
                <input className="spot-form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}/>
                </label>
                <label> State
                <input className="spot-form-input"
                value={state}
                onChange={(e) => setState(e.target.value)}/>
                </label>
                <label> Country
                <input className="spot-form-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}/>
                </label>
                <label> Lat
                <input className="spot-form-input"
                value={lat}
                onChange={(e) => setLat(e.target.value)}/>
                </label>
                <label> Lng
                <input className="spot-form-input"
                value={lng}
                onChange={(e) => setLng(e.target.value)}/>
                </label>
                <label> Name
                <input className="spot-form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
                </label>
                <label> Description
                <input className="spot-form-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label> Price
                <input className="spot-form-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}/>
                </label>

                <button className="submit-button"> Submit Changes </button>
            </form>
            </div>
            )
        }
        </>
    
    );

}

export default SpotFormEdit;