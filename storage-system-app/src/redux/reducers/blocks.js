export default function blocks(state = {
    allBusinessWithLocation: [],
    selectedBusiness: null,
    selectedBusinessLocations: [],
    selectLocation: null,
    errorPresent: false
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "SET_BUSINESSES":
            newState = { ...newState, allBusinessWithLocation: [...action.newValue] };
            break;
        case "CHANGE_SELECTED_BUSINESS":
            newState = { ...newState, selectedBusiness: action.newValue };
            break;
        case "CHANGE_SELECTED_BUSINESS_LOCATIONS":
            newState = { ...newState, selectedBusinessLocations: action.newValue };
            break;
        case "CHANGE_SELECTED_LOCATIONS":
            newState = { ...newState, selectLocation: action.newValue };
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