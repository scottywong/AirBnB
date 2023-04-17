import { useState,useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSpot } from '../../../store/spot';

const SpotListItem = ({spot}) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state=> state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [previewImage,setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    spot? setIsLoaded(true) : setIsLoaded(false);
    /**** Check if you own Spot, if so load "Edit" + "Delete" Buttons */
    currentUser?.id === spot?.ownerId ? setIsOwner(true):setIsOwner(false);
  
    !spot.previewImage ? setPreviewImage('https://media.gettyimages.com/id/1255835530/photo/modern-custom-suburban-home-exterior.webp?s=2048x2048&w=gi&k=20&c=aJN8I5LYNsnKsCbp-D-a9nySQAjabZLaNHOQMSFBYnE='):
      setPreviewImage(spot.previewImage);

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
        <div className="block mx-10 my-10 text-center w-72 h-96 shadow-md rounded-l spot-item-container">
          <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

            <a href={`/spots/${spot.id}`}>
              <img className="w-full h-1/2 rounded-lg spot-item-previewImage" src={previewImage}></img>
            </a>

           
            <div className='text-right mt-2 mr-3 italic h-4'>
               {isLoaded && isOwner && <p> Your Spot</p>}
              {/* <i className="fas fa-house-chimney-user fa-2xl"></i> */}
            </div>

           
            <div className='mt-6 flex flex-col justify-center align-middle spot-item-detail'>

              <NavLink className="text-lg sm:text-l md:text-xl spot-item-name" to={`/spots/${spot.id}`}>{spot.name}</NavLink>
              <p>{spot.city}, {spot.country} </p>
              <p><b>${spot.price}</b> night</p>

            </div>
        {isLoaded && isOwner && 
            (
            <div className='w-full mt-3 flex-row space-x-5 spot-item-button '>
            <button className="spot-item-edit w-16 h-8 bg-ared cursor-pointer rounded-l transition-shadow shadow-md hover:shadow-lg hover:text-white" onClick={()=>history.push(`/spots/${spot.id}/edit`)}> Edit </button> 
            <button onClick={handleDelete} className="spot-item-delete w-16 h-8 bg-ared cursor-pointer rounded-l transition-shadow shadow-md hover:shadow-lg  hover:text-white"> Delete </button>  
            </div>
            )   
        }  
        </div>
    );
}

export default SpotListItem;