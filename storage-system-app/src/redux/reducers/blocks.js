export default function blocks(state = {
    allBusinessWithLocation: [],
    errorPresent: false
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "SET_BUSINESSES":
            newState = { ...newState, allBusinessWithLocation: [...action.newValue] };
            break;
        case "ERROR_CREATED":
            newState = { ...newState, errorPresent: true };
            break;
        default:

            newState = { ...state }
            break;
    }
    return newState;
}