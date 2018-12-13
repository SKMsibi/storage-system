import axios from 'axios';
import * as actions from "./actions";

function setHeaders() {
    var token = sessionStorage.getItem("jwtToken");
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
    }
}

(function () {
    setHeaders();
})();


export function getBusinessesForUnits() {
    return async (dispatch) => {
        var allTheBusiness = await axios.get('http://localhost:3003/businesses');
        if (allTheBusiness.data) {
            dispatch(actions.getBusinessesForUnits(allTheBusiness.data));
        }
    };
};
export function getAllUnitTypesForUnis() {
    return async (dispatch) => {
        try {
            var allAvailableUnitTypes = await axios.get('http://localhost:3003/unitTypes');
            dispatch(actions.getUnitTYpeForUnits(allAvailableUnitTypes.data));
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function getLocationsForUnits() {
    return async (dispatch) => {
        var allTheLocations = await axios.get('http://localhost:3003/allAvailableLocations');
        if (allTheLocations.data) {
            dispatch(actions.getLocationsForUnits(allTheLocations.data));
        }
    };
};
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
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function submitLocation(location) {
    return async (dispatch) => {
        try {
            dispatch({ type: "START_LOCATION_SUBMISSION" });
            await axios.post('http://localhost:3003/businessLocation', location);
        } catch (error) {
            dispatch({ type: "ERROR_CREATED" });
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
export function getAllBlocks(businessName) {
    return async (dispatch) => {
        try {
            var allBlocks = await axios.get('http://localhost:3003/blocks/' + businessName);
            dispatch(actions.getBlocksForUnit(allBlocks.data));
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function getAllUnitTypes() {
    return async (dispatch) => {
        try {
            var allAvailableUnitTypes = await axios.get('http://localhost:3003/unitTypes');
            dispatch(actions.changeUnitTypes(allAvailableUnitTypes.data));
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function submitAUnitType(typeValues) {
    return async (dispatch) => {
        try {
            dispatch(actions.submittingNewUnitType());
            await axios.post('http://localhost:3003/unitTypes', typeValues);
            dispatch(actions.completeNewUnitTypeSubmitting());
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED" });
        }
    };
};
export function submitUnit(unitValues, selectedUnitType, selectedBusiness) {
    return async (dispatch) => {
        try {
            dispatch(actions.submittingUnit())
            await axios.post('http://localhost:3003/unit', { ...unitValues, unitType: selectedUnitType, selectedBusiness: selectedBusiness });
            dispatch(actions.completeUnitSubmission());
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED_ADDING_UNIT" });
        }
    };
};
export function signIn(userInfo) {
    return async (dispatch) => {
        try {
            var requestResults = await axios.post('http://localhost:3003/signUp', userInfo);
            if (requestResults.status === 204) {
                dispatch({ type: "ERROR_CREATED_SIGNING_IN", newValue: "email already exists!" })
            } else {
                dispatch({ type: "REMOVE_ERRORS" });
                sessionStorage.setItem("jwtToken", requestResults.data.token);
                setHeaders();
            }
        } catch (error) {
            console.log('error :', error);
            dispatch({ type: "ERROR_CREATED_SIGNING_IN", newValue: "something went wrong" })
        }
    };
};
export function logIn(userInfo) {
    return async (dispatch) => {
        try {
            var requestResults = await axios.post('http://localhost:3003/logIn', userInfo);
            console.log('requestResults.status :', requestResults.status);
            if (requestResults.status === 202) {
                dispatch({ type: "REMOVE_ERRORS" });
                sessionStorage.setItem("jwtToken", requestResults.data.token);
                setHeaders();
            } else if (requestResults.status === 200) {
                dispatch({ type: "REMOVE_ERRORS" });
                sessionStorage.setItem("jwtToken", requestResults.data.token);
                setHeaders();
            } else if (requestResults.status === 204) {
                dispatch({ type: "ERROR_CREATED_LOGGING_IN", newValue: "Wrong Email or password." })
            } else {
                dispatch({ type: "ERROR_CREATED_LOGGING_IN", newValue: "something went wrong" })
            }
        } catch (error) {
            console.log('error is:', error);
            dispatch({ type: "ERROR_CREATED_LOGGING_IN", newValue: "something went wrong" })
        }
    };
};
export function getAllAvailableUnits(searchBy, searchPhrase) {
    return async (dispatch) => {
        var allUnits = await axios.get(`http://localhost:3003/allUnits/${searchBy}/${searchPhrase}`);
        if (allUnits.data) {
            dispatch(actions.getAllUnitsForDisplay(allUnits.data));
        }
    };
};

export function PlaceOrder(unitDetails) {
    return async (dispatch) => {
        try {
            await axios.post('http://localhost:3003/unit/order', unitDetails);
        } catch (error) {
            // console.log('error is:', error);
            // dispatch({ type: "ERROR_CREATED_LOGGING_IN", newValue: "something went wrong" })
        }
    };
};
export function getUserUnits() {
    return async (dispatch) => {
        try {
            var userUnits = await axios.get('http://localhost:3003/user/units');
            dispatch(actions.getAllUserUnits(userUnits.data.units))
        } catch (error) {
            // console.log('error is:', error);
            // dispatch({ type: "ERROR_CREATED_LOGGING_IN", newValue: "something went wrong" })
        }
    };
};

