import { useState , useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpot} from "../../store/spot";
import './EditSpotForm.css'