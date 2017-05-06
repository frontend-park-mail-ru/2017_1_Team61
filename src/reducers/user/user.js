import {handleActions} from 'redux-actions';
import {LOGIN_USER} from '../../actions/user/user';

export const userReducer = handleActions({
    [LOGIN_USER]: (state, action) => {
        // todo
        return state;
    }
}, {
    token: '',
    isLogged: false,
    login: ''
});

export default userReducer;
