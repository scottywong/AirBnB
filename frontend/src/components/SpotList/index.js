import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spot"; 
// import { NavLink, Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import './SpotList.css';
import SpotListItem from './SpotListItem';

const SpotList = ({spotListType}) => {

const dispatch = useDispatch();
const {id} = useParams();

let spots = useSelector(state=> state.spot.spot);

if(id && spots){
  
  spots = spots.filter(spot => spot.ownerId === parseInt(id));
  
}

useEffect(()=> {
  dispatch(fetchSpots());
},[dispatch]);

  return (
    <div className="spot-list-container">
      <h1 className="spot-list-header">Spot List</h1>
      <ol className="spot-list">
   
        {
        spots &&
          (
            spots.map((spot) => {
            // console.log('ze spot: ', spot);
            
            return <li key={spot.id}>
                      <SpotListItem spot={spot}/>
                   </li>
        
            })
          )
        }

      </ol>

    </div>
  );
}

export default SpotList;