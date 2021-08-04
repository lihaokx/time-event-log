import { baseUrl } from '../shared/url';

import fetchWithTimeOut from '../helperFunc/fetchWithTimeOut';
 
 const addEventCreatorFunc = () => {
    return({
        type: "addEventRow",
        payload: {
            start: '',
            stop : '',
            event: '',
            period: '',
            importance: 1
        }
    })};

const addStopValueFunc = (value, keyId) => {
    return({
        type: "addStopValue",
        payload: {
            stop: {value},
            keyId: keyId
        }
    })};

const addStartValueFunc = (value, keyId) => {
    return({
        type: "addStartValue",
        payload: {
            start: {value},
            keyId: keyId
        }
    })};


const addEventValueFunc = (value, keyId) => {
    return({
        type: "addEventValue",
        payload: {
            event: {value},
            keyId: keyId
        }
    })};

const addImportanceValueFunc =(value, keyId) => {
    return({
        type: "addImportanceValue",
        payload: {
            importance: {value},
            keyId: keyId
        }
    })};

const changeDashBoardFunc = (dashboardValue) => {
    return({
        type: "changeDashBoard",
        payload: {
            dashboardValue: dashboardValue
        }
    })};

const changeNumRowsCanvasFunc = (numRowsCanvas) => {
    return({
        type: "changeNumRowsCanvas",
        payload: {
            numRowsCanvas: numRowsCanvas
        }
})};

const purgeStateFunc =() => {
    return(
       {
            type: "purgeState",
            payload: ''
       }
        )
}
export const purgeState =() => (dispatch) => {
    dispatch(purgeStateFunc())
    
}

export const changeNumRowsCanvas= (numRowsCanvas) => (dispatch) => {
    dispatch( changeNumRowsCanvasFunc(numRowsCanvas) );
}

export const changeDashBoard = (dashboardValue) => (dispatch) => {
    dispatch( changeDashBoardFunc(dashboardValue) );
}

export const addEventValue = (value, keyId) => (dispatch) => {
    dispatch(addEventValueFunc(value, keyId));
}

export const addStopValue = (value, keyId) => (dispatch) => {
    dispatch(addStopValueFunc(value, keyId));
}
    
export const addStartValue = (value, keyId) => (dispatch) => {
    dispatch(addStartValueFunc(value, keyId));
}

export const addImportanceValue= (value, keyId) => (dispatch) => {
    dispatch(addImportanceValueFunc(value, keyId));
}

export const addEventCreator = () => (dispatch) => {
    dispatch(addEventCreatorFunc());
}

export const saveIsLoadingFunc = () => {
    return {
        type: "isLoading",
        payload:''
    }
}

export const saveIsNotLoadingFunc = () => {
    return {
        type: "notLoading",
        payload:''
    }
}



export const saveRows = (rows, todayDate, dashBoard) => (dispatch) => {
 
    // const bearer = 'Bearer ' + localStorage.getItem('token');
    // console.log('type of start: ', typeof rows[0].start);
    // console.log('type of date: ',   todayDate);
    const postRows ={
        "date": todayDate, 
        "rows": rows,
        "dashBoard": dashBoard
    } 
    // console.log("postRows(before post): ", postRows)
    dispatch(saveIsLoadingFunc())
    const bearer = 'Bearer ' + localStorage.getItem('token');
    // console.log('bearer: ',   bearer);
    return fetchWithTimeOut(baseUrl, {
        method: 'POST',
        body: JSON.stringify(postRows),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
        // credentials: "same-origin"
    }, 10000)
    .then(response => response.json(), error => {throw error} )
    .then(response => {
        // the initial response converted to a readable response
        // console.log("ifResponseSuccess: ", response)
        if (response.success) {
            // console.log("response: ", response.status)
            // alert(response.status)
 
            dispatch(saveIsNotLoadingFunc())
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => { 
        // console.log('Post rows ', error);
        dispatch(saveIsNotLoadingFunc())
 
        alert('Your rows could not be posted\n '+ error); })
}




