import { useHistory } from "react-router-dom";
import './Footer.css';

const Footer = () => {

    const history = useHistory();
    
    return (

        <div className="footer-container">

        <div className="footer-link-container">
             <i onClick={() => window.open('https://github.com/scottywong/AirBnB')} className="fa-brands fa-github fa-2xl"></i>
             <i onClick={() => window.open('https://www.linkedin.com/in/wongscott')} className="fa-brands fa-linkedin fa-2xl"></i>
             <div id='footer-name'>Scotty W.  </div>
        </div>

        </div>
    )
}

export default Footer;