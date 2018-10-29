import axios from 'axios';
import * as actions from "./actions";
export function getBusinesses() {
    return async (dispatch) => {
        var allTheBusiness = await axios.get('http://localhost:3003/businesses');
        if (allTheBusiness.data) {
            dispatch(actions.getAllBusinesses(allTheBusiness.data));
        }
    };
};
export function submitBusiness(businessData) {
    return async (dispatch) => {
        try {
            await axios.post('http://localhost:3003/businessData', businessData);
            dispatch({ type: "SUBMIT" });
        } catch (error) {
            dispatch({ type: "ERROR_PRESENT" });
        }
    };
};
export function submitLocation(location) {
    return async (dispatch) => {
        try {
            dispatch({ type: "START_LOCATION_SUBMISSION" });
            await axios.post('http://localhost:3003/businessLocation', location);
        } catch (error) {
            dispatch({ type: "ERROR_LOCATION" });
        }
    };
}
