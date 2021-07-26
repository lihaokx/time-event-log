import {dashBoard} from '../shared/dashBoard';
 

export const  dashBoardReducer = ( state = dashBoard, action)=> {
    
    
    switch (action.type){
        case  "changeDashBoard":
            console.log("action.payload.dashboardValue before: ",  action.payload.dashboardValue);
            var newDashBoard = action.payload.dashboardValue;
            return newDashBoard;        

        default:
            return state;
    }
}


