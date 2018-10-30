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

}
