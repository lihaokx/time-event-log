 
import { addEventCreator, addStopValue, addStartValue, saveRows, addEventValue , addImportanceValue, changeDashBoard} from '../reduxReducer/actionCreators';
import { connect } from 'react-redux';
import { Col , Row, Button,  Card, CardBody, CardHeader, Media } from 'reactstrap';

import { Control, LocalForm } from 'react-redux-form';
import { useEffect} from 'react';

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
    saveRows: (rows) => {dispatch(saveRows(rows))}
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

    function handleSave(){
        props.saveRows(props.rows);
    }

    async function dashFunction(rows) {
        var importanceP1 = [0,0];
        var importanceN1 = [0,0];
        var importance0 =  [0,0];
        var total =[0,0];
    
        for(const row of rows){
            if (row.period != ""){
            switch(row.importance){
                case 0 :
                    console.log("row.period: ", row.period);
                    importance0[0] = importance0[0] +parseInt(row.period.split(":")[0] );
                    importance0[1] = importance0[1] +parseInt(row.period.split(":")[1]);
                    importance0[0] = importance0[0] + Math.floor(importance0[1]/60);
                    importance0[1] = importance0[1]%60;
                    console.log("row.id: ", row.id, "importance0: ", importance0)
                    continue;
            
                case -1:
                    console.log("row.period: ", row.period);
                    importanceN1[0] = importanceN1[0] +parseInt(row.period.split(":")[0] );
                    importanceN1[1] = importanceN1[1] +parseInt(row.period.split(":")[1]);
                    importanceN1[0] = importanceN1[0] + Math.floor(importanceN1[1]/60);
                    importanceN1[1] = importanceN1[1]%60;
                    console.log("row.id: ", row.id, "importanceN1: ", importanceN1)
                    continue;

                case 1:
                    console.log("row.period: ", row.period);
                    importanceP1[0] = importanceP1[0] +parseInt(row.period.split(":")[0] );
                    importanceP1[1] = importanceP1[1] +parseInt(row.period.split(":")[1]);
                    importanceP1[0] = importanceP1[0] + Math.floor(importanceP1[1]/60);
                    importanceP1[1] = importanceP1[1]%60;
                    console.log("row.id: ", row.id, "importanceP1: ", importanceP1)
                    continue;
                 }
            }

        }
        total[0] = importanceP1[0] + importanceN1[0] + importance0[0];
        total[1] = importanceP1[1] + importanceN1[1] + importance0[1];
        total[0] = total[0] + Math.floor(total[1]/60);
        total[1] = total[1]%60;
        console.log("total: ", total);
        var dashboardValue ={
            importanceP1: (importanceP1[0] < 9 ? "0" : "") + importanceP1[0] + ":" + (importanceP1[1] < 9 ? "0" : "") + importanceP1[1],
            importanceN1: (importanceN1[0] < 9 ? "0" : "") + importanceN1[0] + ":" + (importanceN1[1] < 9 ? "0" : "") + importanceN1[1],
            importance0: (importance0[0] < 9 ? "0" : "") + importance0[0] + ":" + (importance0[1] < 9 ? "0" : "") + importance0[1],
            total: (total[0] < 9 ? "0" : "") + total[0] + ":" + (total[1] < 9 ? "0" : "") + total[1],
        }
        console.log("dashboardValue: ", dashboardValue);
        return dashboardValue;
    }

    // when row.imporatance change, it will change the dashboard function
    // can not put object(array) in the [] of useEffect 
    // the size of dependency can not change. Thus, use join method to join them as a single string
    useEffect(() => {
        dashFunction(props.rows)
        .then((dashboardValue) => props.changeDashBoard(dashboardValue))
        console.log("props.rows: ", props.rows);
    }, [[...props.rows.map(row => row.period).join(","), ...props.rows.map(row => row.importance).join(",")].join(",")])

    
    // useEffect(()=>{
        
    // }, [...props.rows.map(row => row.stop)] )
    
    console.log("props.rows.map(row => row.period)]: ", [...props.rows.map(row => row.period).join(","), ...props.rows.map(row => row.importance).join(",")].join(","));

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
                                                    className="form-control" onChange={ handleInputChange(element.id)}  />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={7}>
                                        <Control.input   type="text"  model=".event" id="event" name="event"  size="65" placeholder="Things you have done" value={element.event}
                                            className="form-control" onChange={ handleInputChange(element.id)}/>
                                    </Col>

                                <Col  md={1}>
                                    <Row >
                                        <Col md={5}>
                                            <Control.select   model=".importance" id="importance" name="importance" defaultValue={element.importance}   className="form-control"
                                             onChange={ handleInputChange(element.id)} >
                                                <option value={-1}>-1</option>
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                </Col>
                             </Row>  
                             </LocalForm  > 
                ))}

            <div className ="row bottomBtn">

                <Button className="btn-top col-md-2 offset-md-5" type="submit" color="secondary" onClick ={(values) => handleClick(values) }>
                    Add a new event
                </Button>
                <Button className="btn-top col-md-1 offset-md-1"   color="secondary" onClick ={() => handleSave() }>
                    Save
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
