
import {  Row, Col } from 'reactstrap';

const Header = () => {
    return ( 
            <div className="row">
                <div className="col-xs-12 col-md-1 ">Start       </div>
                <div className="col-xs-12 col-md-1 ">Stop       </div>
                <div className="col-xs-12 col-md-8 ">Event       </div>
                <div className="col-xs-12 col-md-1 ">Period      </div>
                <div className="col-xs-12 col-md-1 ">Importance  </div>
            </div>
     );
}
 
export default Header;

 