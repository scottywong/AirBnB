import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchSpotById, updateSpot} from "../../store/spot";
import { useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './EditSpotForm.css';

const EditSpotForm = () => {
 
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    let spot = useSelector(state=> state.spot.spot);
    let isLoaded = false;

    useEffect(()=>{
        dispatch(fetchSpotById(id));
        dispatch(sessionActions.restoreUser());
    },[])

    useEffect(()=> {
    
      if(spot){
          setSpotData({
            address: spot?.address || '',
            city: spot?.city || '',
            state: spot?.state || '',
            country: spot?.country ||'',
            lat:spot?.lat || '',
            lng:spot?.lng || '',
            name: spot?.name || '',
            description: spot?.description || '',
            price: spot?.price ||''
        })
     }
    }, [spot]);

    if(currentUser && spot && currentUser.id === spot.ownerId){
    isLoaded = true; 
    }

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    
    const [spotData, setSpotData] = useState({
        address: spot?.address || '',
        city: spot?.city || '',
        state: spot?.state || '',
        country: spot?.country ||'',
        lat:spot?.lat || '',
        lng:spot?.lng || '',
        name: spot?.name || '',
        description: spot?.description || '',
        price: spot?.price ||''
    });

    // const [address,setAddress] = useState((spot) ? spot.address : "");
    // const [city,setCity] = useState((spot) ? spot.city: "");
    // const [state,setState] = useState((spot) ?spot.state: "");
    // const [country,setCountry] = useState((spot) ?spot.country: "");
    // const [lat,setLat] = useState((spot) ?spot.lat: "");
    // const [lng,setLng] = useState((spot) ?spot.lng: "");
    // const [name,setName] = useState((spot) ?spot.name: "");
    // const [description,setDescription] = useState((spot) ? spot.description: "");
    // const [price,setPrice] = useState((spot) ? spot.price: "");  
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = 
            spotData
            // address,
            // city,
            // state,
            // country,
            // lat,
            // lng,
            // name,
            // description,
            // price
        

        return dispatch(updateSpot(payload))
        .then((res) => history.push(`/spots/${res.payload.id}`));
        
    }

    return (
        <>
        {
          Array.isArray(spot) && (<p>Loading...</p>)
        }
        {!Array.isArray(spot) && !isLoaded &&
        (
          <p>  You don't own this </p>

        )}

        {isLoaded 
           &&
           (
            <div className="edit-spot-form-container">
            <h1> Edit Spot</h1>
            <form className="edit-spot-form" onSubmit={onSubmit}>
                <label> Address
                <input className="spot-form-input"
                value={spotData.address}
                onChange={(e) => {
                    spotData.address = e.target.value;
                    setSpotData(spotData);}}/>
                </label>
                {/* <label> City
                <input className="spot-form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}/>
                </label>
                <label> State
                <input className="spot-form-input"
                value={spotData.state}
                onChange={(e) => setState(e.target.value)}/>
                </label>
                <label> Country
                <input className="spot-form-input"
                value={spotData.country}
                onChange={(e) => setCountry(e.target.value)}/>
                </label>
                <label> Lat
                <input className="spot-form-input"
                value={lat}
                onChange={(e) => setLat(e.target.value)}/>
                </label>
                <label> Lng
                <input className="spot-form-input"
                value={spotData.lng}
                onChange={(e) => setLng(e.target.value)}/>
                </label>
                <label> Name
                <input className="spot-form-input"
                value={spotData.name}
                onChange={(e) => setName(e.target.value)}/>
                </label>
                <label> Description
                <input className="spot-form-input"
                value={spotData.description}
                onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label> Price
                <input className="spot-form-input"
                type="number"
                value={spotData.price}
                onChange={(e) => setPrice(e.target.value)}/>
                </label> */}

                <button className="submit-button"> Submit Changes </button>
            </form>
            </div>
            )
        }
        </>
    
    );

}

export default EditSpotForm;