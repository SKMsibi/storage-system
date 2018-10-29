import { reducer as formReducer } from 'redux-form'
import business from './business';
import location from './location'
import { combineReducers } from 'redux'

export default combineReducers({
    form: formReducer,
    business: business,
    location: location
});