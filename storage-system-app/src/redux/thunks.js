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
};
export function getAllBusinessesWithLocations() {
    return async (dispatch) => {
        try {
            var allTheBusiness = await axios.get('http://localhost:3003/businessesWithLocations');
            dispatch(actions.getBusinessesWithLocation(allTheBusiness.data))
        } catch (error) {
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function getBusinessLocations(business) {
    return async (dispatch) => {
        try {
            var allBusinessLocations = await axios.get('http://localhost:3003/locationsForBusiness/' + business);
            dispatch(actions.changeBusinessLocationsInBlocks(allBusinessLocations.data))
        } catch (error) {
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function submitBlocks(blocks, businessName, location) {
    return async (dispatch) => {
        try {
            await axios.post('http://localhost:3003/submitBlocks', { formValues: blocks, businessName: businessName, selectedLocation: location });
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};