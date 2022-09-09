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
    const [isOwner, setIsOwner] = useState(false);
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state, setState] = useState('');
    const [country,setCountry] = useState('');
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [numReviews,setNumReviews] = useState('');
    const [avgRating, setAvgRating] = useState('');
    const [previewImage,setPreviewImage] = useState('');
    const [displayCopyMessage, setDisplayCopyMessage] = useState(false);
    const [errors, setErrors] = useState([]);
    
    useEffect(()=> {
      dispatch(fetchSpotById(id))
        .then((spot)=> {
                if(currentUser && currentUser.id === spot.ownerId){
                  setIsOwner(true);
                } else {
                  setIsOwner(false);
                }
                if(spot) setIsLoaded(true);
                setAddress(spot.address);
                setCity(spot.city);
                setState(spot.state);
                setCountry(spot.country);
                setName(spot.name);
                setPrice(spot.price);
                setNumReviews(spot.numReviews);
                setAvgRating(spot.avgStarRating);
                if(!spot.previewImage){
                  setPreviewImage('https://media.gettyimages.com/id/1255835530/photo/modern-custom-suburban-home-exterior.webp?s=2048x2048&w=gi&k=20&c=aJN8I5LYNsnKsCbp-D-a9nySQAjabZLaNHOQMSFBYnE=');
                } else {
                  setPreviewImage(spot.previewImage);
                }
      })
    },[dispatch,isLoaded, isOwner]);
  
  
    const handleDelete = (e) => {

      e.preventDefault();
      
      return dispatch(removeSpot(id))
      .then(() => history.push(`/users/${currentUser.id}/spots`))
      .catch(async (res) => {
        const data = await res.json();
        console.log('data to delete from spotdetail: ', data);
        if (data && data.errors) setErrors(data.errors)
      })
      
    
  }

    const handleShare = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href);
      setDisplayCopyMessage(true);
      setTimeout( function() {
          setDisplayCopyMessage(false);
      }, 1000);
    }
  
    return (
      <>
      {isLoaded &&(
        
      <div className="spot-header">
         <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        <div className="spot-title"><h1>{name}</h1></div>
        <div className="spot-subtitle">
        <i class="fa-sharp fa-solid fa-star"></i> 
        <span className="spot-rating">{avgRating} </span>
        <span className="spot-reviews">{numReviews} reviews</span>
        <span className="spot-location">{city}, {state}, {country}</span>
        <span className="share-button-container"><button className="share-button" onClick={handleShare}><i class="fa-solid fa-share"></i> Share</button>
        {displayCopyMessage && <span id="copy-message-container"><span id="copy-message"> Copied to clipboard!</span></span>}
        </span>
        </div>
      </div>
      )}
      <div className="spot-detail-actions">
          {isOwner &&
              (
              <>
              <button className="spot-item-edit" onClick={()=>{history.push(`/spots/${id}/edit`)}}> Edit </button> 
              <button onClick={handleDelete} className="spot-item-delete"> Delete </button>  
              <br/>
              </>
              )   
          }  
          </div>
      <img className="spot-detail-previewImage" src={previewImage}></img>
        <div className="spot-detail-container">
    
          {/* <div className="spot-detail">
            <>
                <h1>{name}</h1>
                <p>{address}</p>
                <p>{city}</p>
                <p>{state}</p>
                <p>{country}</p>
                <p>{price}</p>
             </>
          </div> */}
          

          {isLoaded && currentUser && !isOwner &&
          (
          <div  className="booking-form-create-container">
            <BookingFormCreate spotId={id} />
          </div>
          )
          }
          {
            isLoaded && !currentUser && (<p>You must be logged in to make a booking.</p>)
          }
           {!isLoaded && (<p>Page not found.</p>)}

        </div>
       
        </>
    );
};

export default SpotDetail;