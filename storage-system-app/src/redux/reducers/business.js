export default function FormState(state = {
    allBusinesses: [],
    selectedBusiness: ""
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "GET_BUSINESSES":
            newState = { ...newState, allBusinesses: [...action.value] };
            break;
        case "BUSINESSES_NAME":
            newState = { ...newState, selectedBusiness: action.value };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}