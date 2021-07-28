 
import { addEventCreator, addStopValue, addStartValue, saveRows, 
    addEventValue , addImportanceValue, changeDashBoard, purgeState} from '../reduxReducer/actionCreators';
import { connect } from 'react-redux';
import { Col , Row,Form,FormGroup, Input, Button,  Card, CardBody, CardHeader, Media } from 'reactstrap';

import { Control, LocalForm } from 'react-redux-form';
import { useEffect, useState} from 'react';
import  {ConfigureStore} from '../reduxReducer/configureStore';
import checkIfDateEmpty from "../helperFunc/checkIfDateEmpty";
import checkIfRowsEmpty from "../helperFunc/checkIfRowsEmpty";
import dashFunction from '../helperFunc/dashFunction';

const persistor = ConfigureStore().persistor;

const mapStateToProps = state => {
    return {
      rows: state.rows,
      dashBoard: state.dashBoard
    }
}
  

const mapDispatchToProps = dispatch => ({  
    addEventRow: () => { dispatch(addEventCreator())},
    addStop: (value, keyId)=> {dispatch(addStopValue(value, keyId))},
    addStart: (value, keyId)=> {dispatch(addStartValue(value, keyId))},
    addEvent: (value, keyId)=> {dispatch(addEventValue(value, keyId))},
    addImportance: (value, keyId)=> {dispatch(addImportanceValue(value, keyId))},
    changeDashBoard: (dashboardValue) => {dispatch(changeDashBoard(dashboardValue))},
    saveRows: (rows, todayDate) => {dispatch(saveRows(rows, todayDate))},
    purgeState: () => {dispatch(purgeState())}
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

    function handleSave(todayDate){
        // props.saveRows(props.rows, todayDate)

        const datePromise = checkIfDateEmpty( todayDate);
        datePromise
        .then(() =>{return  checkIfRowsEmpty(props.rows )})
        .then(() =>{props.saveRows(props.rows, todayDate)},
            (err) => {console.error("Error message: ", err.message);
            alert(err.message); 
            }
        )
    }

    function changeBackgrdColor (rows){
        for(let i=0; i<rows.length; i++){
            var currentId = 'a'+i.toString();
            console.log("rows ", i, " ", rows[i])
            var currentRow = document.getElementsByClassName(currentId);

            switch (rows[i].importance){
                case 0:
                    for(let i=0; i<currentRow.length; i++){
                        currentRow[i].style.backgroundColor = '#9df2f5';
                    }
                    continue;
                case 1:
                    for(let i=0; i<currentRow.length; i++){
                        currentRow[i].style.backgroundColor = '#ff9f87';
                    }
                    continue;
                case -1:
                    for(let i=0; i<currentRow.length; i++){
                        currentRow[i].style.backgroundColor = '#f0eef3';
                    }
                    continue;
            }
        }
    }

    function purge ()  {
        // purge the states in local storage
        persistor.purge()
        .then(() => {
            return persistor.flush()
            })
        // Purge the states
        props.purgeState()
        ;
      }

    

    // when row.imporatance change, it will change the dashboard function
    // can not put object(array) in the [] of useEffect 
    // the size of dependency can not change. Thus, use join method to join them as a single string
    useEffect(() => {
        dashFunction(props.rows)
        .then((dashboardValue) => {props.changeDashBoard(dashboardValue)
            return Promise.resolve()
        })
        .then(( )=> changeBackgrdColor(props.rows))
        console.log("props.rows: ", props.rows);
    }, [[...props.rows.map(row => row.period).join(","), ...props.rows.map(row => row.importance).join(",")].join(",")])

    
    // useEffect(()=>{
        
    // }, [...props.rows.map(row => row.stop)] )
    
    console.log("props.rows.map(row => row.period)]: ", [...props.rows.map(row => row.period).join(","), ...props.rows.map(row => row.importance).join(",")].join(","));
    const [todayDate, setTodayDate] = useState("");

    const handleDate = () => (event) =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log("todayDate: ", name);
        console.log("value: ", value);
        setTodayDate(value);  
        console.log("todayDate: ", todayDate);    
    }


    const  handleInputChange = (keyId) =>(event) =>{
        const target = event.target;
        // const value = target.type === 'select' ? target.checked : target.value;
        const value = target.value
        const name = target.name;
        console.log("name: ", name)
        console.log("value: ", value)
        console.log("keyId: ", keyId)
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
            case "importance" :
                console.log("event value: ", value);
                var valueInt=parseInt(value);
               
                props.addImportance(valueInt, keyId);                    

                break;
            // case "period" :
            //     // console.log("event value: ", value);
            //     props.addEvent(value, keyId);  
            //     break;
            default:
                return null;
        }
    }

    
    return ( 
        <div>
           
                <h4 className="mt-5">Date of Today</h4>
                <br></br>
                <div className="row justify-content-center">
                    <FormGroup className="col-3">
                        <Input type= "date" id="todayDate" name="todayDate" onChange={handleDate()}/>
                    </FormGroup>
                </div>
                <div className="row justify-content-center header-top">

                <div className="row  col-4 justify-content-center">
                    <div className=" col-4 ">Start       </div>
                    <div className=" col-4 ">Stop       </div>
                    <div className=" col-4 ">Period       </div>
                </div>
                    <div className="col-7">Event      </div>
                    <div className="col-1">Importance  </div>
                </div>
                {props.rows.map(element => { 
                return(  
                        <LocalForm  key={element.id}>  
                           {/* <LocalForm  onSubmit ={(values) => handleClick(values) } >  */}
                         <Row className="form-group form-top-buffer">                                              
                                <Col  md={4}>
                                    <Row >
                                        <Col  md={4}>
                                            <Control.input   type="time"  model=".start"  name="start" value={element.start}
                                                className= {"form-control rowsBold " + 'a' +element.id.toString()} key={element.id}  onChange={ handleInputChange(element.id)} />
                                        </Col>
                                        <Col   md={4}>
                                            <Control.input   type="time"  model=".stop"  name="stop" value={element.stop}
                                                className={"form-control rowsBold " + 'a' +element.id.toString()} onChange={ handleInputChange(element.id)} />
                                        </Col>
                                        <Col md={4}>
                                            {/* <p  className="form-control"> <b>{diff(element.start, element.stop) }</b> </p> */}
                                                <Control.input  type="text"  model=".period" name="period" value= {diff(element.start, element.stop) }
                                                    className={"form-control rowsBold "  + 'a' +element.id.toString()} onChange={ handleInputChange(element.id)}  />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={7}>
                                        <Control.input   type="text"  model=".event"  name="event" size="65" placeholder="Things you have done" value={element.event}
                                            className={"form-control rowsBold eventCol " + 'a' +element.id.toString()} onChange={ handleInputChange(element.id)}/>
                                    </Col>

                                <Col  md={1}>
                                    <Row >
                                        <Col md={5}>
                                            <Control.select   model=".importance"   name="importance" defaultValue={element.importance}    
                                            className={"form-control rowsBold "  + 'a' +element.id.toString()}  onChange={ handleInputChange(element.id)} >
                                                <option value={-1}>-1</option>
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                </Col>
                             </Row>  
                             </LocalForm  > 
                )}
                )}

            <div className ="row bottomBtn">

                <Button className="btn-top col-md-2 offset-md-5" type="submit" color="secondary" onClick ={(values) => handleClick(values) }>
                    Add a new event
                </Button>
                <Button className="btn-top col-md-1 offset-md-1"   color="secondary" onClick ={() => handleSave(todayDate) }>
                    Save
                </Button>
                <Button className="btn-top col-md-1 offset-md-1"   color="secondary" onClick ={() => purge() }>
                    Reset
                </Button>
   
            </div>
           
            <Card>
                <CardHeader className="bg-primary ">Dashboard</CardHeader>
                <CardBody  >
                    <dl className="row p-1 dashboardTable">
                        <dt className="col-6"> </dt>
                        <dd className="col-6">Time consumed</dd>
                        <dt className="col-6">Importance of 1: </dt>
                        <dd className="col-6 dsb">{props.dashBoard.importanceP1}</dd>
                        <dt className="col-6">Importance of 0: </dt>
                        <dd className="col-6 dsb">{props.dashBoard.importance0}</dd>
                        <dt className="col-6">Importance of -1: </dt>
                        <dd className="col-6 dsb">{props.dashBoard.importanceN1}</dd>
                        <dt className="col-6">Total:</dt>
                        <dd className="col-6 dsb">{props.dashBoard.total}</dd>
                    </dl>
                </CardBody>
            </Card>
        </div>
        
     );
}
 
export default  connect(mapStateToProps, mapDispatchToProps)(EventRow);
