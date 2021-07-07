
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

export const addEventCreator = () => (dispatch) => {
    dispatch(addEventCreatorFunc());
}




