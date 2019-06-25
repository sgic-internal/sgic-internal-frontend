import axios from 'axios';
import {loginUser, userAuthenticationSuccess, userAuthenticationError} from '../actions/index';

function userLogin(loginCredential) {
    return(dispatch) => {
       // dispatch(fetchProductsPending());
   console.log(loginCredential.username);
        axios.get("http://localhost:8082/login/getByUserMail/"+ loginCredential.username).then(function (res) {
            console.log(res);
            
            dispatch(userAuthenticationSuccess(res.data));
            return res;
        })
        .catch(function (error) {
            // handle error
            dispatch(userAuthenticationError(error));
            console.log(error);
        });
       // .finally(function () {
            // always executed
        //});
           
       
    }
    
}

export default userLogin;