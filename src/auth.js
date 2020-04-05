export default class Auth {
    signIn = (data) => {
        localStorage.setItem('sign_in', true);
        localStorage.setItem('jwt_token', data.jwtToken);
        localStorage.setItem('user_name', data.userName);
        localStorage.setItem('first_name', data.firstName);
        localStorage.setItem('last_name', data.lastName);
    }

    signOut = () => {
        localStorage.setItem('sign_in', false);
    }

    isAuthenticated = () => {
        const signIn = localStorage.getItem('sign_in');
        return signIn && signIn == 'true';
    }

    userName = () => {
        return localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
    }
}