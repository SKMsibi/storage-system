export default function FormState(state = {
    allBusinesses: [],
    selectedBusiness: "",
    businessSubmitted: false,
    errorOnSubmitting: false
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "GET_BUSINESSES":
            newState = { ...newState, allBusinesses: [...action.value] };
            break;
        case "BUSINESSES_NAME":
            newState = { ...newState, selectedBusiness: action.value };
            break;
        case "SUBMIT":
            newState = { ...newState, businessSubmitted: true };
            break;
        case "COMPLETE_SUBMISSIONS":
            newState = { ...newState, businessSubmitted: false };
            break;
        case "ERROR_CREATED":
            newState = { ...newState, errorOnSubmitting: true };
            break;
        case "ERROR_NOT_PRESENT":
            newState = { ...newState, errorOnSubmitting: false };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}