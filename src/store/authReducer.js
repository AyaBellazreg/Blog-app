const initState = {
    authError: null,
    signUpStatus: null
}

const authReducer = (state = initState, action)=>{
    switch(action.type){
        case 'SIGN_IN_SUCCESS':
            console.log('sign in succeeded');
        return {
            ...state,
            authError: null
        }
        case 'SIGN_IN_ERR': 
            console.log('sign in failed', action.err);
        return {
            ...state,
            authError: action.err.message
        }
        //SIGN IN

        case 'LOGOUT_SUCCESS': 
            console.log(action.type);
        return state;
        case 'LOGOUT_FAILED': 
            console.log(action.type);
        return state;
        //LOGOUT

        case 'SIGN_UP_SUCCESS':
            console.log("sign up succeeded");
        return {
            ...state,
            signUpStatus: null
        }
        case 'SIGN_UP_FAILED':
            console.log('sign up failed');
        return {
            ...state,
            signUpStatus: action.err.message
        }
        //SIGN UP
        default: 
        return state
    }
}

export default authReducer;