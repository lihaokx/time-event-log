import {RowOfEvent} from '../shared/eventRowFile';
 

export const  rowEventReducer = (state=RowOfEvent, action)=> {
    // console.log("action.payload before: ", action.payload);
    function diff(start, end) {
        // start = document.getElementById("start").value; //to update time value in each input bar
        // end = document.getElementById("end").value; //to update time value in each input bar
        // console.log("state:", state);
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        if (parseInt(end[0]) <= 3 && parseInt(start[0]) >= parseInt(end[0])  ){
            var endDate = new Date(0, 0, 1, end[0], end[1], 0);
        }
        else{
            var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        }
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
    
        return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
    }
    // console.log("state in rowEventReducer: ", state);

    switch (action.type){
        case  "addEventRow"  :
            var rows = state;
            var newRow = action.payload;
            var today = new Date();
            var hour = (today.getHours()<10?'0':'') + today.getHours() + ":" ;
            var min = (today.getMinutes()<10?'0':'') + today.getMinutes();
            var time = hour+min;
            // console.log("min time: ", today.getMinutes()<10?'0':''  );            
            // console.log("current time: ", time);
            rows[rows.length-1].stop = time;
            rows[rows.length-1].period = diff(rows[rows.length-1].start, rows[rows.length-1].stop);
            newRow.id = state.length;
            newRow.start = rows[rows.length-1].stop;
            
            return rows.concat(newRow);        
            
        case "addStartValue" :
            var array0 = state;
            var array20 = array0.map(a => {
                var returnValue0 = {...a};
                if (a.id === action.payload.keyId) {
                    returnValue0.start = action.payload.start.value;
                    returnValue0.period = diff(action.payload.start.value, returnValue0.stop);
                }
                return returnValue0;
            })
            return array20;

        case  "addStopValue":
            var array1 = state;
            var array21 = array1.map(a => {
                var returnValue1 = {...a};
                if (a.id === action.payload.keyId) {
                    returnValue1.stop = action.payload.stop.value;
                    returnValue1.period = diff(returnValue1.start, action.payload.stop.value);
                    
                }
                
                // change next start by this 
                if(a.id === action.payload.keyId+1){
                    returnValue1.start = action.payload.stop.value;
                    returnValue1.period = diff(returnValue1.start, returnValue1.stop);
                }
                return returnValue1;
              
            })
            return array21;

        case  "addEventValue":
            var array2 = state;
            var array22 = array2.map(a => {
                var returnValue2 = {...a};
                if (a.id === action.payload.keyId ) {
                returnValue2.event = action.payload.event.value;
                }
                return returnValue2;
            })
            // console.log("new array: ", array22)
            return array22;

        case  "addImportanceValue":
            var array3 = state;
            var array33 = array3.map(a => {
                var returnValue3 = {...a};
                if (a.id === action.payload.keyId ) {
                returnValue3.importance = action.payload.importance.value;
                // console.log("returnValue3: ", returnValue3);
            }
                
                return returnValue3;
            })
            // console.log("array33: ", array33);
            return array33;
        //purge state, then return the initial value
        case "purgeState":
            return RowOfEvent;

        default:
            return state;
    }
}


