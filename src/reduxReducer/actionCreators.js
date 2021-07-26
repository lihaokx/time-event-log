
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

export const endChangeNextStart = () => (dispatch) => {

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



export const saveRows = (rows) => (dispatch) => {

    // const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch('http://localhost:2020/RowsOfEvents', {
        method: 'POST',
        body: JSON.stringify(rows),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())

    .catch(error => { console.log('Post rows ', error.message);
        alert('Your rows could not be posted\nError: '+ error.message); })
}

