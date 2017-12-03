import { combineReducers } from 'redux';

import { authenticate } from './authenticate.reducers';
import {adminReducer} from  './adminReducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
// import { alert } from './alert.reducer';

const rootReducer = combineReducers({
	authenticate,
	adminReducer
	// registration,
	// users,
	// alert
});

export default rootReducer;