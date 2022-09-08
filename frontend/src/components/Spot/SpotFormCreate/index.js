import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpot} from "../../../store/spot";
import './SpotFormCreate.css'

const SpotFormCreate = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [lat,setLat] = useState('');
    const [lng,setLng] = useState('');
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [previewImage,setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);


    const spot = useSelector((state) => state.spot.spot);

    if (spot?.id) return history.push(`/spots/${spot.id}`);

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

        return dispatch(createSpot(payload))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        // .then((spot) => history.push(`/spots/${spot.id}`));
        
    }

    return (
        <div className="create-spot-form-container">
        <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <h1> Create a New Spot</h1>
        <form className="create-spot-form" onSubmit={onSubmit}>
        
            <label> Address </label>
            <input className="spot-form-input"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}/>
            <label> City </label>
            <input className="spot-form-input"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}/>
            <label> State </label>
            <input className="spot-form-input"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}/>
            <label> Country</label>
            <input className="spot-form-input"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}/>
            <label> Lat </label>
            <input className="spot-form-input"
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)}/>
            <label> Lng </label>
            <input className="spot-form-input"
            required
            value={lng}
            onChange={(e) => setLng(e.target.value)}/>
            <label> Name </label>
            <input className="spot-form-input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            <label> Description </label>
            <input className="spot-form-input"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
            <label> Price </label>
            <input className="spot-form-input"
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}/>
            <label id="label-previewImage"> Preview Image (URL) </label>
            <input className="spot-form-input"
            required
            type="url"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}/>
        </form>

        <button onClick={onSubmit} className="submit-button"> Create Spot</button>

        </div>
    )
};

export default SpotFormCreate;