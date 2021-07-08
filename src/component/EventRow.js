 
import { addEventCreator, addStopValue, addStartValue, addEventValue } from '../reduxReducer/actionCreators';
import { connect } from 'react-redux';
import {   Col , Row, Button} from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      rows: state
    }
  }

const mapDispatchToProps = dispatch => ({  
    addEventRow: () => { dispatch(addEventCreator())},
    addStop: (value, keyId)=> {dispatch(addStopValue(value, keyId))},
    addStart: (value, keyId)=> {dispatch(addStartValue(value, keyId))},
    addEvent: (value, keyId)=> {dispatch(addEventValue(value, keyId))}
  });
  
function diff(start, end) {
    // start = document.getElementById("start").value; //to update time value in each input bar
    // end = document.getElementById("end").value; //to update time value in each input bar
    
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}
// console.log("diff: ", diff(" 00", "7:20"));

const EventRow = (props ) => {
    console.log("props: ", props)
    // console.log("RowOfEvent: ", RowOfEvent)

    function handleClick(values) {
        console.log('props: ', props);
        // alert('Current State is: ' + JSON.stringify(values));
        props.addEventRow( );
        // event.preventDefault();
    }

    const  handleInputChange = (keyId) =>(event) =>{
        const target = event.target;
        // const value = target.type === 'select' ? target.checked : target.value;
        const value = target.value
        const name = target.name;
        console.log("name: ", name)

        switch (name){
            case  "start"  :
                props.addStart(value, keyId); 
                break;
            case "stop" :
                props.addStop(value, keyId);  
                break;
            case "event" :
                // console.log("event value: ", value);
                props.addEvent(value, keyId);  
                break;
 
            default:
                return null;
        }
    }
 
    return ( 
        <div>
                {props.rows.map(element => (  
                        <LocalForm  key={element.id}>  
                           {/* <LocalForm  onSubmit ={(values) => handleClick(values) } >  */}
                         <Row className="form-group form-top-buffer">                                              
                                <Col  md={4}>
                                    <Row >
                                        <Col  md={4}>
                                            <Control.input  type="time"  model=".start"  id="start" name="start" value={element.start}
                                                className="form-control" key={element.id}  onChange={ handleInputChange(element.id)} />
                                        </Col>
                                        <Col   md={4}>
                                            <Control.input   type="time"  model=".stop" id="stop" name="stop" value={element.stop}
                                                className="form-control"  onChange={ handleInputChange(element.id)} />
                                        </Col>
                                        <Col md={4}>
                                            {/* <p  className="form-control"> <b>{diff(element.start, element.stop) }</b> </p> */}
                                                <Control.input  type="text"  model=".period" id="period" name="period" value= {diff(element.start, element.stop) }
                                                    className="form-control"   />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={7}>
                                        <Control.input   type="text"  model=".event" id="event" name="event"  size="65" value={element.event}
                                            className="form-control" onChange={ handleInputChange(element.id)}/>
                                    </Col>

                                <Col  md={1}>
                                    <Row >
                                        <Col md={5}>
                                            <Control.select   model=".importance" id="importance" name="importance" value={element.importance}   className="form-control"  >
                                                <option value="-1 ">-1</option>
                                                <option value="0  ">0</option>
                                                <option value="1  ">1</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                </Col>
                             </Row>  
                             </LocalForm  > 
                ))}
                             
            <Button className="btn-top" type="submit" color="secondary" onClick ={(values) => handleClick(values) }>
                 Add a new event
            </Button>
            
        </div>
        
     );
}
 
export default  connect(mapStateToProps, mapDispatchToProps)(EventRow);
