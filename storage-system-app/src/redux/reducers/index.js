import { reducer as formReducer } from 'redux-form'
import business from './business'
import { combineReducers } from 'redux'

export default combineReducers({
    form: formReducer,
    business: business
});