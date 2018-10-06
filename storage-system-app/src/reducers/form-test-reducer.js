export default function FormState(state = {
    grid: [],
}, action) {
    var newState = { ...state }
    switch (action.type) {
        case "SUBMIT_FORM":
            newState = { ...newState, pathWays: newState.allStages[newState.stage] };
            break;
        default:
            newState = { ...state }
            break;
    }
    return newState;
}