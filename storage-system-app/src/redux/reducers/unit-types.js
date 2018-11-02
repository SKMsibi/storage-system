export default function unitType(state = {
    allUnitTypes: [],
    typeSubmitted: false,
    typeSubmitting: false,
    errorOnSubmitting: false

}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "SET_UNIT_TYPES":
            newState = { ...newState, allUnitTypes: action.newValue };
            break;
        case "START_NEW_TYPE_SUBMISSION":
            newState = { ...newState, typeSubmitting: true, typeSubmitted: false };
            break;
        case "COMPLETE_NEW_TYPE_SUBMISSION":
            newState = { ...newState, typeSubmitting: false, typeSubmitted: true };
            break;
        case "ERROR_CREATED":
            newState = { ...newState, typeSubmitting: false, typeSubmitted: false, errorOnSubmitting: true };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}