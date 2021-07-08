import {RowOfEvent} from '../shared/eventRowFile';
 

export const  rowEventReducer = (state=RowOfEvent, action)=> {
    // console.log("action.payload before: ", action.payload);
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

    switch (action.type){
        case  "addEventRow"  :
            var rows = state;
            var newRow = action.payload;
            var today = new Date();
            var hour = today.getHours() + ":" ;
            var min = (today.getMinutes()<10?'0':'') + today.getMinutes();
            var time = hour+min;
            console.log("min time: ", today.getMinutes()<10?'0':''  );            
            console.log("current time: ", time);
            rows[rows.length-1].stop = time;
            newRow.id = state.length;
            newRow.start = rows[rows.length-1].stop;
            
            return rows.concat(newRow);        
            
        case "addStartValue" :
            let array = state;
            let array2 = array.map(a => {
                let returnValue = {...a};
              if (a.id === action.payload.keyId) {
                returnValue.start = action.payload.start.value;
                returnValue.period = diff(action.payload.start.value, returnValue.stop);
              }
              return returnValue;
            })
            return array2;

        case  "addStopValue":
            let array = state;
            let array2 = array.map(a => {
                let returnValue = {...a};
              if (a.id === action.payload.keyId) {
                returnValue.stop = action.payload.stop.value;
                returnValue.period = diff(returnValue.start, action.payload.stop.value);
              }
              return returnValue;
            })
            return array2;

        case  "addEventValue":
            let array = state;
            let array2 = array.map(a => {
                let returnValue = {...a};
                if (a.id === action.payload.keyId ) {
                returnValue.event = action.payload.event.value;
                }
                return returnValue;
            })
            return array2;

        default:
            return state;
    }
}


