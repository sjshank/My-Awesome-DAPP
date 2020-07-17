
const initialState = {
    contractInstance: null,
    account: ''
}

//Reducer for handling action dispatched from react component
const reducer = (state = initialState, action) => {
    if (action.type === 'SET_CONTRACT_INSTANCE') {
        return {
            ...state,
            contractInstance: action.instance,
            account: action.account
        }
    }
    return state;
}

export default reducer;