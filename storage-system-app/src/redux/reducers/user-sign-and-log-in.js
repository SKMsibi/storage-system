export default function SignInLogIn(state = {
    errorPresent: false,
    errorMessage: null
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "ERROR_CREATED_SIGNING_IN":
            newState = { ...newState, errorPresent: true, errorMessage: action.newValue };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}