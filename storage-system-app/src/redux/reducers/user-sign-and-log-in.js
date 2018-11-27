export default function SignInLogIn(state = {
    errorPresent: false,
    errorMessage: null
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "ERROR_CREATED_LOGGING_IN":
            newState = { ...newState, errorPresent: true, errorMessage: action.newValue };
            break;
        case "ERROR_CREATED_SIGNING_IN":
            newState = { ...newState, errorPresent: true, errorMessage: action.newValue };
            break;
        case "REMOVE_ERRORS":
            newState = { ...newState, errorPresent: false, errorMessage: "s" };
            break;
        default:


            newState = { ...state }
            break;
    }
    return newState;
}