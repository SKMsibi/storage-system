export default function displayUnits(state = {
    searchBy: '',
    searchPhrase: '',
    allBusiness: [],
    allUnitTypes: [],
    allLocations: [],
    allUnits: [],
    allUserUnits: [],
    showInput: false,
    displayUnits: false,
    displaySelected: false,
    showLocationDropDown: false
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "UPDATE_SEARCH_BY":
            newState = { ...newState, searchBy: action.newValue };
            break;
        case "UPDATE_SEARCH_PHRASE":
            newState = { ...newState, searchPhrase: action.newValue };
            break;
        case "GET_ALL_BUSINESSES":
            newState = { ...newState, allBusiness: action.newValue };
            break;
        case "GET_ALL_UNIT_TYPES":
            newState = { ...newState, allUnitTypes: action.newValue };
            break;
        case "GET_ALL_LOCATIONS":
            newState = { ...newState, allLocations: action.newValue };
            break;
        case "GET_ALL_UNITS":
            newState = { ...newState, allUnits: action.newValue };
            break;
        case "GET_ALL_USER_UNITS":
            newState = { ...newState, allUserUnits: action.newValue };
            break;
        case "SHOW_INPUT":
            newState = { ...newState, showInput: true };
            break;
        case "HIDE_INPUT":
            newState = { ...newState, showInput: false };
            break;
        case "DISPLAY_UNITS":
            newState = { ...newState, displayUnits: true };
            break;
        case "HIDE_UNITS":
            newState = { ...newState, displayUnits: false };
            break;
        case "DISPLAY_SELECTED":
            newState = { ...newState, displaySelected: true };
            break;
        case "HIDE_SELECTED":
            newState = { ...newState, displaySelected: false };
            break;
        case "DISPLAY_LOCATION_DROP_DOWN":
            newState = { ...newState, showLocationDropDown: true };
            break;
        case "HIDE_LOCATION_DROP_DOWN":
            newState = { ...newState, showLocationDropDown: false };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}