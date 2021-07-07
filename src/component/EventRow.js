import {RowOfEvent} from '../shared/eventRowFile';
import { addEventCreator } from '../reduxReducer/actionCreators';
import { connect } from 'react-redux';
import {   Col , Row} from 'reactstrap';
import { Control,Form, LocalForm } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      rows: state
    }
  }

const mapDispatchToProps = dispatch => ({  
    addEvent: () => { dispatch(addEventCreator())}
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
    console.log("RowOfEvent: ", RowOfEvent)

    function handleClick(values) {
        console.log('values: ', values);
        // alert('Current State is: ' + JSON.stringify(values));
 
        props.addEvent( );
        // event.preventDefault();
    }
    var element =props.rows[0];
    return ( 
        <div>
                {props.rows.map(element => (  
                        <LocalForm  key={element.id}>  
                           {/* <LocalForm  onSubmit ={(values) => handleClick(values) } >  */}
                         <Row className="form-group">                                              
                                <Col  md={4}>
                                    <Row >
                                        <Col  md={4}>
                                            <Control.input   type="time"  model=".start"  id="start" name="start" defaultValue={element.start}
                                                className="form-control"  />
                                        </Col>
                                        <Col   md={4}>
                                            <Control.input   type="time"  model=".stop" id="stop" name="stop" defaultValue={element.stop}
                                                className="form-control"  />
                                        </Col>
                                        <Col md={4}>
                                                <Control.input  type="time"  model=".period" id="period" name="period" defaultValue={element.period}
                                                    className="form-control"  />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={7}>
                                        <Control.input   type="text"  model=".event" id="event" name="event"  size="65" defaultValue={element.event}
                                            className="form-control"  />
                                    </Col>

                                <Col  md={1}>
                                    <Row >
                                        <Col md={5}>
                                            <Control.select   model=".importance" id="importance" name="importance" defaultValue={element.importance}
                                                className="form-control"  >
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
                             
            <button type="submit" color="primary" onClick ={(values) => handleClick(values) }>
                Add
            </button>
                             
 
            

            
            
        </div>
        
     );
}
 
export default  connect(mapStateToProps, mapDispatchToProps)(EventRow);
