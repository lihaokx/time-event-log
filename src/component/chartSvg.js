import React, { useState } from "react";
import { Button, Tooltip, UncontrolledTooltip } from "reactstrap";
import ReactTooltip from 'react-tooltip'; 

const TooltipItem = props => {
  const { row } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  var widthRow = (row.period)/24*100  
  var start = (row.start-4)/24*100

  return (
    <React.Fragment>
        {/* <rect
            id = {"Tooltip-" + row.id}       
            x={(row.start-4)/24*100+'%'}
            y={5}
            width={(row.period)/24*100+'%'}
            height={5.5}
            fill= {row.color}
            stroke = "#050"
            strokeWidth={0.01}>
        </rect> */}

        <path
        className="Tooltip" 
        d= {`M${start} 5 L${start} 10.5 L${start+widthRow} 10.5 L${start+widthRow} 5 Z`} 
        id = {"Tooltip-" + row.id}   
        fill= {row.color}>
        </path>

        <Tooltip
          placement= "top"
          isOpen={tooltipOpen}
          target={"Tooltip-" + row.id}
          toggle={toggle}>
          {row.event}
        </Tooltip>  
    </React.Fragment>
  );
}; 

const ChartSvg = (props) => {

    const cordTag = ['06:00', '08:00', '10:00', '12:00', '14:00',
                    '16:00', '18:00', '20:00', '22:00', 'Next day', '02:00'
                    ]
    const cord = [...Array(49).keys()]
    // console.log("df: ", cord)
    return ( 
      <React.Fragment>
        <svg  viewBox="0 0 100 15" className="svgB" >            
            {cord.map((i) => {
                var x = 100/48*i
                if(i%2 ===0){ 
                return(
                    <path key={i} stroke="red" strokeWidth={0.1} d={`M${x} 10.5 L${x} 12`} />                    
                )}
                if(i%2 ===1){ 
                return(
                    <path key={i} stroke="red" strokeWidth={0.05} d={`M${x} 10.5 L${x} 11.5`} />                    
                )}

            })}

            {cordTag.map((time, i) => {
                
                var x = 100/12*i
                // console.log("time: ", time, ' i: ', i, ' x: ', x)
                return(
                    <text key={i} x={x+6.7 +'%'} y={14} fill="black" fontSize = {6+'%'} > {time} </text>
                )
            })}

            {props.numRowsCanvas.map((row ) => { 
            return( 
                <TooltipItem key={row.id} row={row} />
             )})}  

        </svg>
 
      </React.Fragment>
     );
}

export default ChartSvg;