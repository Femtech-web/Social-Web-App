import axios from "axios";
import { loginSuccess } from '../../Redux/userRedux';

export const initialForm = {
    fullname: '',
    email: '',
    confirmPassword: '',
    password: ''
};

export const errorInitialState = {
    emptyField: false,
    passwordMismatch: false,
    shortPassword: false        
};

export const googleDispatch = (dispatch) => {
    return (
         async function googleSuccess(tokenResponse){
            const { data } = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
        );
        
        try {
            dispatch(loginSuccess({currentUser: data, token: tokenResponse.access_token}))
            console.log({currentUser: data, token: tokenResponse.access_token});
        } catch (error) {
            console.log(error)
        }
        }
        
    )
};

export const googleFailure = () => {
    console.log('Google Sign in was Unsuccessful. Try again Later')
};

