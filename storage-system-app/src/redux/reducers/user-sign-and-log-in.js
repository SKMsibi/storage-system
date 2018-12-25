export default function SignInLogIn(state = {
    userLoggedIn: false,
    loggedInUserRole: null,
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
        case "LOGGED_OUT":
            newState = { ...newState, userLoggedIn: false, loggedInUserRole: null }
            break;
        case "LOGGED_IN":
            newState = { ...newState, userLoggedIn: true, loggedInUserRole: action.newValue }
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}