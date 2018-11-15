export function getAllBusinesses(businesses) {
    return { type: "GET_BUSINESSES", value: businesses }
};
export function changeSelectedBusiness(name) {
    return { type: "BUSINESSES_NAME", value: name }
};
export function removeError() {
    return { type: "ERROR_NOT_PRESENT" };
};
export function getBusinessesWithLocation(businesses) {
    return { type: "SET_BUSINESSES", newValue: businesses };

};
export function changeSelectedBusinessInBlocks(newBusiness) {
    return { type: "CHANGE_SELECTED_BUSINESS", newValue: newBusiness }
};
export function changeBusinessLocationsInBlocks(locations) {
    return { type: "CHANGE_SELECTED_BUSINESS_LOCATIONS", newValue: locations }
};
export function changeLocationsInBlocks(location) {
    return { type: "CHANGE_SELECTED_LOCATIONS", newValue: location }
};
export function changeUnitTypes(types) {
    return { type: "SET_UNIT_TYPES", newValue: types }
};
export function setSelectedType(type) {
    return { type: "SET_SELECTED_UNIT_TYPE", newValue: type }
};
export function submittingNewUnitType() {
    return { type: "START_NEW_TYPE_SUBMISSION" }
};
export function completeNewUnitTypeSubmitting() {
    return { type: "COMPLETE_NEW_TYPE_SUBMISSION" }
};
export function getBlocksForUnit(blocks) {
    return { type: "SET_BLOCKS", newValue: blocks }
};
export function submittingUnit() {
    return { type: "START_UNIT_SUBMISSION" }
};
export function completeUnitSubmission() {
    return { type: "COMPLETE_UNIT_SUBMISSION" }
};

export function getBusinessesForUnits(businesses) {
    return { type: "GET_ALL_BUSINESSES", newValue: businesses }
};
export function getUnitTYpeForUnits(unitTypes) {
    return { type: "GET_ALL_UNIT_TYPES", newValue: unitTypes }
};
export function getLocationsForUnits(locations) {
    return { type: "GET_ALL_LOCATIONS", newValue: locations }
};
export function getAllUnitsForDisplay(units) {
    return { type: "GET_ALL_UNITS", newValue: units }
};

