import {dashBoard} from '../shared/dashBoard';
 

export const  dashBoardReducer = ( state = dashBoard, action)=> {
    
    
    switch (action.type){
        case  "changeDashBoard":
            // console.log("action.payload.dashboardValue before: ",  action.payload.dashboardValue);
            var newDashBoard = action.payload.dashboardValue;
            newDashBoard.percent ={}
            newDashBoard.percent.total = parseInt(newDashBoard.total.split(":")[0]) + parseInt(newDashBoard.total.split(":")[1]) / 60;
            newDashBoard.percent.importanceP1 = Math.round((parseInt(newDashBoard.importanceP1.split(":")[0]) + parseInt(newDashBoard.importanceP1.split(":")[1]) / 60) /newDashBoard.percent.total *100);
            newDashBoard.percent.importanceN1 =Math.round( (parseInt(newDashBoard.importanceN1.split(":")[0]) + parseInt(newDashBoard.importanceN1.split(":")[1]) / 60) /newDashBoard.percent.total *100);
            newDashBoard.percent.importance0 =Math.round((parseInt(newDashBoard.importance0.split(":")[0]) + parseInt(newDashBoard.importance0.split(":")[1]) / 60) /newDashBoard.percent.total *100);
            // console.log("newDashBoard: ", newDashBoard)
            return newDashBoard;        

        default:
            return state;
    }
}


