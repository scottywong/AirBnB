import { useEffect } from 'react';
import { useRef } from 'react';
import './HostPage.css';
import { useHistory } from 'react-router-dom';

const HostPage = () => {

const history = useHistory();
const hostPageVideo = useRef(null);

useEffect(()=> {

if(hostPageVideo.current){

    hostPageVideo.current.play().catch(function (error) {
    });   
}

},[]);

const handleTryHost = (e) => {
    e.preventDefault();
    history.push('/signup');

};
  

return (
        <div className='host-header'>
        <div className='host-hero-cta'>
            <p id="hero-text">Open your door to hosting</p>
            <button id="try-hosting-button" onClick={handleTryHost}> Try Hosting</button>
        </div>
            <video ref={hostPageVideo} id='host-page-video' width="50%" height="50%">
                <source type="video/mp4" src="https://a0.muscache.com/v/a9/a7/a9a7873c-95de-5e37-8995-a5abb5b6b02f/a9a7873c95de5e378995a5abb5b6b02f_4000k_1.mp4">
                </source>
            </video>
        </div>

);

};

export default HostPage;