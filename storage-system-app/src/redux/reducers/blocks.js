export default function blocks(state = {
    allBusinessWithLocation: []
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "SET_LOCATIONS":
            newState = { ...newState, allBusinessWithLocation: [...action.newValue] };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}