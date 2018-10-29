export default function location(state = {
    allBusinesses: [],
    selectedBusiness: "",
    submittingLocation: false,
    LocationSubmitted: false,
    errorOnSubmitting: false
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "START_LOCATION_SUBMISSION":
            newState = { ...newState, LocationSubmitted: false, submittingLocation: true };
            break;
        case "COMPLETE_LOCATION_SUBMISSION":
            newState = { ...newState, LocationSubmitted: true, submittingLocation: false };
            break;
        case "ERROR_LOCATION":
            newState = { ...newState, LocationSubmitted: false, submittingLocation: false };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}