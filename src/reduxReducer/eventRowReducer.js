import {RowOfEvent} from '../shared/eventRowFile';
 

export const  rowEventReducer = (state=RowOfEvent, action)=> {
    // console.log("action.payload before: ", action.payload);
    switch (action.type){
        case  "addEventRow"  :
            var newRow = action.payload;
            newRow.id = state.length;
            return state.concat(newRow);            
        default:
            return state;
    }
}


