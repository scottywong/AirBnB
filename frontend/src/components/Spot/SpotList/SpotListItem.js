import { useState,useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSpot } from '../../../store/spot';

import './SpotListItem.css';

const SpotListItem = ({spot}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state=> state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [previewImage,setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    if(spot){
      setIsLoaded(true)
    } else {
      setIsLoaded(false);
    }
    /**** Check if you own Spot, if so load "Edit" + "Delete" Buttons */
    if(currentUser && currentUser.id === spot.ownerId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    
    if(!spot.previewImage){
      setPreviewImage('https://media.gettyimages.com/id/1255835530/photo/modern-custom-suburban-home-exterior.webp?s=2048x2048&w=gi&k=20&c=aJN8I5LYNsnKsCbp-D-a9nySQAjabZLaNHOQMSFBYnE=');
    } else {
      setPreviewImage(spot.previewImage);
    }
  },[dispatch,currentUser,isLoaded,isOwner]);
  
  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(removeSpot(spot.id))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }
    return(
        <div className="spot-item-container">
          <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <br/>
            {isLoaded && isOwner && <i class="fa-solid fa-house-chimney-user fa-2xl"></i>}
            
            <a href={`/spots/${spot.id}`} target="_blank">
              <img className="spot-item-previewImage" src={previewImage}></img>
            </a>
            <NavLink className="spot-item-name" to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            <p>{spot.city}, {spot.country} </p>
            <p><b>${spot.price}</b> night</p>
        
        {isLoaded && isOwner &&
            (
            <>
            <button className="spot-item-edit" onClick={()=>history.push(`/spots/${spot.id}/edit`)}> Edit </button> 
            <button onClick={handleDelete} className="spot-item-delete"> Delete </button>  
            <br/>
            </>
            )   
        }  
        </div>
    );
}

export default SpotListItem;