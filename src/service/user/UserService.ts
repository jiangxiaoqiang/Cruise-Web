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