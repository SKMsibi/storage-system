export default function unit(state = {
    unitSubmitted: false,
    unitSubmitting: false,
    allBlocks: [],
    selectedUnitType: null
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "START_UNIT_SUBMISSION":
            newState = { ...newState, unitSubmitting: true, unitSubmitted: false };
            break;
        case "COMPLETE_UNIT_SUBMISSION":
            newState = { ...newState, unitSubmitting: false, unitSubmitted: true };
            break;
        case "SET_BLOCKS":
            newState = { ...newState, allBlocks: action.newValue };
            break;
        case "SET_SELECTED_UNIT_TYPE":
            newState = { ...newState, selectedUnitType: action.newValue };
            break;

        default:
            newState = { ...state }
            break;
    }
    return newState;
}