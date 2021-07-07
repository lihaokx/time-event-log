import {RowOfEvent} from '../shared/eventRowFile';
import { addEventCreator } from '../reduxReducer/actionCreators';
import { connect } from 'react-redux';
import {   Col , Row} from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';

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

    function handleClick() {
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        props.addEvent( );
        // event.preventDefault();
    }
    return ( 
        <div>
            <LocalForm  >
                {props.rows.map(element => (                    
                        <div  key={element.id}>                            
                            <Col >
                                <Control.input   type="time"  model=".start" id="start" name="start" defaultValue={element.start}
                                    className="form-control"
                                />
                            </Col>
                            

                            <div className="col-xs-12 col-md-1">
                                <input type="time"  id="start" name="start" defaultValue={element.start} />
                            </div>
                            <div className="col-xs-12 col-md-1">
                                <input type="time" id="stop" name="stop" defaultValue={element.stop} />
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <input type="text" id="event" name="event"  size="65" defaultValue={element.event}/>
                            </div>

                            <div className="col-xs-12 col-md-1">
                                {/* diff(document.getElementById("start").value , document.getElementById("stop").value) */}
                                <input type="time" id="period" name="period"  defaultValue={ diff( element.start, element.stop)}/>
                            </div>
                            <div className="col-xs-12 col-md-1">
                                <select name="importance" id="importance"   >
                                    <option value="-1 ">-1</option>
                                    <option value="0  ">0</option>
                                    <option value="1  ">1</option>
                                </select>
                            </div>
                        </div>
               ))}
            </LocalForm>

            <button onClick = {() => handleClick()}>
                Add
            </button>

        </div>
        
     );
}
 
export default  connect(mapStateToProps, mapDispatchToProps)(EventRow);
