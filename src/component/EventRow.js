 
import { addEventCreator, addStopValue, addStartValue, saveRows, 
    addEventValue , addImportanceValue, changeDashBoard, purgeState, 
    changeNumRowsCanvas } from '../reduxReducer/actionCreators';
import { connect } from 'react-redux';
import { Col , Row, FormGroup, Input, Button, UncontrolledTooltip, Card, CardBody } from 'reactstrap';
import { PieChart } from 'react-minimal-pie-chart';
import { Control, LocalForm } from 'react-redux-form';
import { useEffect, useState} from 'react';
import  {ConfigureStore} from '../reduxReducer/configureStore';
import checkIfDateEmpty from "../helperFunc/checkIfDateEmpty";
import checkIfRowsEmpty from "../helperFunc/checkIfRowsEmpty";
import dashFunction from '../helperFunc/dashFunction';
import ChartSvg from './chartSvg';
import {threeColors} from '../shared/threeColors'
// import ReactTooltip from 'react-tooltip';

const persistor = ConfigureStore().persistor;

const mapStateToProps = state => {
    return {
      rows: state.rows,
      dashBoard: state.dashBoard,
      saveLoading: state.saveLoading,
      numRowsCanvas: state.numRowsCanvas
    }
}
  

const mapDispatchToProps = dispatch => ({  
    addEventRow: () => { dispatch(addEventCreator())},
    addStop: (value, keyId)=> {dispatch(addStopValue(value, keyId))},
    addStart: (value, keyId)=> {dispatch(addStartValue(value, keyId))},
    addEvent: (value, keyId)=> {dispatch(addEventValue(value, keyId))},
    addImportance: (value, keyId)=> {dispatch(addImportanceValue(value, keyId))},
    changeDashBoard: (dashboardValue) => {dispatch(changeDashBoard(dashboardValue))},
    saveRows: (rows, todayDate, dashBoard) => {dispatch(saveRows(rows, todayDate, dashBoard))},
    purgeState: () => {dispatch(purgeState())},
    changeNumRowsCanvas: (numRowsCanvas) => {dispatch(changeNumRowsCanvas(numRowsCanvas))},
  });
  
function diff(start, end) {
    // start = document.getElementById("start").value; //to update time value in each input bar
    // end = document.getElementById("end").value; //to update time value in each input bar
    
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate
    if (parseInt(end[0]) <= 3 && parseInt(start[0]) >= parseInt(end[0])  ){
         endDate = new Date(0, 0, 1, end[0], end[1], 0);
    }
    else{
         endDate = new Date(0, 0, 0, end[0], end[1], 0);
    }
 
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}
// console.log("diff: ", diff(" 00", "7:20"));



const EventRow = (props ) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    function handleClick(values) {
        // console.log('props: ', props);
        // alert('Current State is: ' + JSON.stringify(values));
        props.addEventRow( );
        // event.preventDefault();
    }

    function handleSave(todayDate){
        // props.saveRows(props.rows, todayDate)
        // console.log("todayDate: ", todayDate); 
        const datePromise = checkIfDateEmpty( todayDate);
        datePromise
        .then(() =>{ return   checkIfRowsEmpty(props.rows )})
        .then(() =>{
            // console.log("props.rows:...........", props.rows); 
             props.saveRows(props.rows, todayDate, props.dashBoard)},
            (err) => {
                console.error("Error message: ", err.message);
                alert(err.message); 
            }
        )
    }

    function changeBackgrdColor (rows){
        for(let i=0; i<rows.length; i++){
            var currentId = 'a'+i.toString();
            // console.log("rows ", i, " ", rows[i])
            var currentRow = document.getElementsByClassName(currentId);

            switch (rows[i].importance){
                case 0:
                    for(let i=0; i<currentRow.length; i++){
                        currentRow[i].style.backgroundColor = threeColors.color0;
                    }
                    continue;
                case 1:
                    for(let i=0; i<currentRow.length; i++){
                        currentRow[i].style.backgroundColor = threeColors.colorP1;
                    }
                    continue;
                case -1:
                    for(let i=0; i<currentRow.length; i++){
                        currentRow[i].style.backgroundColor = threeColors.colorN1;
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

    
    //   console.log("props.rows after change importance (outside function): ", props.rows);

    // when row.imporatance change, it will change the dashboard function
    // can not put object(array) in the [] of useEffect 
    // the size of dependency can not change. Thus, use join method to join them as a single string
    useEffect(() => {
        dashFunction(props.rows)
        
        .then((dashboardCanvas) => {props.changeDashBoard(dashboardCanvas.dashboardValue);
            // console.log("dashboardCanvas.numRowsCanvas.............: ", dashboardCanvas.numRowsCanvas)
            props.changeNumRowsCanvas(dashboardCanvas.numRowsCanvas)
            return Promise.resolve()
        })
        .then(( )=> changeBackgrdColor(props.rows))
        // console.log("props.rows: ", props.rows);
    }, [[...props.rows.map(row => row.period).join(","), ...props.rows.map(row => row.event).join(","), ...props.rows.map(row => row.importance).join(",")].join(",")])

    // console.log("numRowsCanvas in rows: ", numRowsCanvas)
    
    // useEffect(()=>{
        
    // }, [...props.rows.map(row => row.stop)] )
    
    // localStorage.clear();
    // console.log("props.rows.map(row => row.period)]: ", [...props.rows.map(row => row.period).join(","), ...props.rows.map(row => row.importance).join(",")].join(","));
    const [todayDate, setTodayDate] = useState("");

    const handleDate = () => (event) =>{
        const target = event.target;
        const value = target.value;
        // const name = target.name;
        // console.log("todayDate: ", name);
        // console.log("value: ", value);
        setTodayDate(value);  
        // console.log("todayDate: ", todayDate);    
    }

    const  handleInputChange = (keyId) =>(event) =>{
        const target = event.target;
        // const value = target.type === 'select' ? target.checked : target.value;
        const value = target.value
        const name = target.name;
        // console.log("name: ", name)
        // console.log("value: ", value)
        // console.log("keyId: ", keyId)
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
                // console.log("event value: ", value);
                var valueInt=parseInt(value);
               
                props.addImportance(valueInt, keyId);                    
                // console.log("props.rows after change importance (inside function): ", props.rows);
                break;
            // case "period" :
            //     // console.log("event value: ", value);
            //     props.addEvent(value, keyId);  
            //     break;
            default:
                return null;
        }
    }
    // console.log("props.rows after change importance (outside function): ", props.rows);
    
    return ( 
        <div>          
                <h4 className="mt-5" data-tip="hello world" data-for='test'>Date of Today </h4>
 
                <br></br>
                <div className="row justify-content-center">
                    <FormGroup className="col-3">
                        <Input type= "date" id="todayDate" name="todayDate" onChange={handleDate()}/>
                    </FormGroup>
                </div>
                <div className="row justify-content-center header-top">

                <div className="row  col-4 justify-content-center">
                <UncontrolledTooltip placement="top" target={"startTool"} hideArrow = {true}>
                    Moment of start.
                </UncontrolledTooltip>
                    <div className=" col-4 " id ='startTool'>Start       </div>

                <UncontrolledTooltip placement="top" target={"stopTool"} hideArrow = {true}>
                    Moment of stop.
                </UncontrolledTooltip>
                    <div className=" col-4 " id ='stopTool'>Stop       </div>

                <UncontrolledTooltip placement="top" target={"periodTool"} hideArrow = {true}>
                    Time difference between start and stop.
                </UncontrolledTooltip>
                    <div className=" col-4 " id ='periodTool'>Period       </div>


                </div>
                <UncontrolledTooltip placement="top" target={"eventTool"} hideArrow = {true}>
                    Things you have done during the period.
                </UncontrolledTooltip>
                    <div className="col-7"  id ='eventTool'>Event      </div>
                <UncontrolledTooltip placement="top" target={"importanceTool"} hideArrow = {true}>
                    Importance level of the event. "1" means very important.<br></br> "0" means normal things.<br></br> "-1" means unrelevant.
                </UncontrolledTooltip>
                    <div className="col-1" id ="importanceTool">Importance  </div>
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
                    Save{console.log(" props.saveLoading: ",  props.saveLoading.ifSaveLoading)}
                    { props.saveLoading.ifSaveLoading? 
                        <i className="fa fa-spinner fa-pulse fa-fw"></i>  : null}
                </Button>
                <Button className="btn-top col-md-1 offset-md-1"   color="secondary" onClick ={() => purge() }>
                    Reset
                </Button>
   
            </div>
            <div className ="row">
                <h2 className="mb-2">Timeline Dashboard</h2>
            <ChartSvg numRowsCanvas ={props.numRowsCanvas}/>
           </div>
            <Card>
                
                <CardBody  >
                    <dl className="row p-1 dashboardTable">
                        <dt className="col-3">Importance of 1:  </dt>
                        <dt className="col-3">Importance of 0: </dt>
                        <dt className="col-3">Importance of -1: </dt>
                        <dd className="col-3 dsb">Total: </dd>
                        <dt className="col-3"> {props.dashBoard.importanceP1}</dt>
                        <dt className="col-3">{props.dashBoard.importance0}</dt>
                        <dt className="col-3"> {props.dashBoard.importanceN1} </dt>
                        <dd className="col-3 dsb">{props.dashBoard.total}</dd>

                    </dl>
                    <div className='row justify-content-center chartCss'>
                        <div className='col-md-5'>
                        <PieChart  
                        data={[
                            { title: props.dashBoard.importanceP1, value: props.dashBoard.percent.importanceP1, color: threeColors.colorP1 },
                            { title: props.dashBoard.importance0, value: props.dashBoard.percent.importance0, color: threeColors.color0 },
                            { title: props.dashBoard.importanceN1, value: props.dashBoard.percent.importanceN1, color: threeColors.colorN1 },
                        ]}
                        label={({ dataEntry }) => `${ Math.round(dataEntry.percentage)} %`}
                        labelPosition={110}
                        paddingAngle={0.1}
                        animate={true}
                        radius={30}
                         
                        />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
        
     );
}
 

export default  connect(mapStateToProps, mapDispatchToProps)(EventRow);
