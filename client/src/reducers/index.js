import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { restaurantReducer } from './restaurantReducer'

const rootReducer = combineReducers({
    form: formReducer,
    restaurant: restaurantReducer
})
export default rootReducer;
