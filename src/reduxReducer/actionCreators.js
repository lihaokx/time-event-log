
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
 
 

export const addEventValue = (value, keyId) => (dispatch) => {
    dispatch(addEventValueFunc(value, keyId));
}

export const addStopValue = (value, keyId) => (dispatch) => {
    dispatch(addStopValueFunc(value, keyId));
}
    
export const addStartValue = (value, keyId) => (dispatch) => {
    dispatch(addStartValueFunc(value, keyId));
}

export const addEventCreator = () => (dispatch) => {
    dispatch(addEventCreatorFunc());
}




