 
export const saveLoadingReducer = (state = {
        ifSaveLoading: false
    }, action) => {
    switch (action.type) {
        case "isLoading":
            return { ifSaveLoading: true
            };
        case "notLoading":
            return { ifSaveLoading: false
            };
        default:
            return state
    }
}