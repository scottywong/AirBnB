import { useParams } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { fetchSpots } from "../../store/spot";
import { useEffect } from "react";

const SpotDetail = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    let spots = useSelector(state=> state.spot.spot);
    let foundSpot;
    
    useEffect(()=> {
      dispatch(fetchSpots());
    },[dispatch]);
    
    // console.log('isitanarray', Array.isArray(spots));

    if(id && Array.isArray(spots)){
    
      foundSpot = spots.find(spot => spot.id === parseInt(id));
    
    }

    return (
        <>
        {foundSpot && (
            <>
                <p><b>{foundSpot.name}</b></p>
                <p>{foundSpot.address}</p>
                <p>{foundSpot.city}</p>
                <p>{foundSpot.state}</p>
                <p>{foundSpot.country}</p>
                <p>{foundSpot.price}</p>
             </>
        )}
        
        </>
    );
};

export default SpotDetail;