import { reducer as formReducer } from 'redux-form';
import business from './business';
import location from './location';
import blocks from './blocks';
import unitType from './unit-types';
import unit from './unit';
import SignInLogIn from './user-sign-and-log-in'
import { combineReducers } from 'redux';

export default combineReducers({
    form: formReducer,
    business: business,
    location: location,
    unitType: unitType,
    blocks: blocks,
    unit: unit,
    SignInLogIn: SignInLogIn
});