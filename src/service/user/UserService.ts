import { getCurrentUserAction } from "../../action/user/UserAction";
import { requestWithAction } from "../../common/XHRClient";

export function getCurrentUser() {
    const config = {
        method: 'get',
        url: '/post/user/current-user',
        headers: {'Content-Type': 'application/json'}
    };
    return requestWithAction(config, getCurrentUserAction);
}

export function doLoginOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cruiseAccessToken');
    localStorage.removeItem('cruiseRefreshToken');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('userInfo');
    window.location.href="https://read.poemhub.top";
}

