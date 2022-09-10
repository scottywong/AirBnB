import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchSpotById, removeSpot, updateSpot} from "../../../store/spot";
import { useParams } from "react-router-dom";
import './SpotFormEdit.css';

const SpotFormEdit = () => {
 
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    const currentUser = useSelector(state=> state.session.user);
    
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
    const [previewImage,setPreviewImage] = useState('');
    const [errors,setErrors] = useState([]);

    //redirect user to home page if they're logged out
    if(!currentUser) history.push('/');

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
                    setPreviewImage(spot.previewImage);
        });
    },[]);

    const onSubmit = async (e) => {
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
            price,
            previewImage
        }

        return dispatch(updateSpot(payload,id))
        .then((spot) => history.push(`/spots/${spot.id}`))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        
    }        

    const handleDelete = (e) => {
        e.preventDefault();
      
        return dispatch(removeSpot(id))
        .then(() => history.push(`/users/${currentUser.id}/spots`))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        <>
        
        {!isLoaded &&
          <p>  Sorry, but you don't have the right permissions to edit this. </p>
        }
        <div  className="edit-spot-form-container">
            {isLoaded 
           &&
           (
            <>
             <ul className="errorMsg">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            
            <div className="edit-spot">
                <h1> Edit Spot</h1>
                <form className="edit-spot-form" onSubmit={onSubmit}>
                    <label> Address </label>
                    <input className="spot-form-input"
                    value={address}
                    onChange={(e) => e.target.value}/>
                    <label> City</label>
                    <input className="spot-form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}/>
                    <label> State </label>
                    <input className="spot-form-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}/>
                    <label> Country </label>
                    <input className="spot-form-input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}/>
                    <label> Lat </label>
                    <input className="spot-form-input"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}/>
                    
                    <label> Lng </label>
                    <input className="spot-form-input"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}/>
                    <label> Name </label>
                    <input className="spot-form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    <label> Description </label>
                    <input className="spot-form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <label> Price </label>
                    <input className="spot-form-input"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                    <label> Preview Image </label>
                    <input className="spot-form-input"
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}/>
                </form>

                <button onClick={onSubmit} className="submit-button"> Submit Changes </button>
            </div>
            </>
            )}

            <div className="spot-edit-actions">
                {isLoaded &&
                (
                <>
                <button onClick={handleDelete} className="spot-item-delete" to={`/spots/${id}`}> Delete </button>  
                <button onClick={()=> history.push(`/spots/${id}`)} className="spot-item-cancel"> Cancel </button>  
                </>
                )   
                }  
            </div>
        </div>
        </>
    
    );

}

export default SpotFormEdit;