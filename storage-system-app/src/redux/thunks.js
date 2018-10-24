import axios from 'axios';
import * as actions from "./actions";
export default function businesses() {
    return async (dispatch) => {
        var allTheBusiness = await axios.get('http://localhost:3003/businesses');
        if (allTheBusiness.data) {
            dispatch(actions.getAllBusinesses(allTheBusiness.data));
        }
    };
}