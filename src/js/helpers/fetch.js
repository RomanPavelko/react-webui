import { progressbarShow, progressbarClear } from "../actions/index";
import store from '../store/index'

export default function fetchFromApi(props)
{
    const { url, method, data } = props;

    return new Promise(function (resolve, reject) {
        store.dispatch(progressbarShow());

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('jwt_token') },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok && response.status !== 400) {
                throw Error(response);
            }
    
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            }

            return response.text();
        })
        .then(results => {
            store.dispatch(progressbarClear());
            resolve(results);
        })
        .catch(function (error) {
            store.dispatch(progressbarClear());
            console.log(error);
            reject(error);
        });
    });
}