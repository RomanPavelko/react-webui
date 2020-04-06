import jwt_decode from 'jwt-decode';
export default class Auth {
    signIn = (data) => {    
        //decode JWT
        const jwt = jwt_decode(data.jwtToken);

        localStorage.setItem('user_name', jwt.sid);
        localStorage.setItem('expiration', jwt.exp);
        localStorage.setItem('first_name', jwt.firstName);
        localStorage.setItem('last_name', jwt.lastName);
        
        localStorage.setItem('jwt_token', data.jwtToken);
    }

    signOut = () => {
        localStorage.removeItem('expiration');
    }

    isAuthenticated = () => {
        return new Date(localStorage.getItem('expiration') * 1000) >= new Date();
    }

    userName = () => {
        return localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
    }
}