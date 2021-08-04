import {numRowsCanvas} from '../shared/numRowsCanvas';
export const  numRowsCanvasReducer = ( state = numRowsCanvas, action)=> {
    switch (action.type){
        case  "changeNumRowsCanvas":
            // console.log("action.payload.numRowsCanvas before: ",  action.payload.numRowsCanvas);
            var newNumRowsCanvas = action.payload.numRowsCanvas;
            // console.log("newNumRowsCanvas: ", newNumRowsCanvas)
            return newNumRowsCanvas; 
        default:
            return state;
    }
}


