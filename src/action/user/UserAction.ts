export function getCurrentUserAction(user:any) {
    return {
        type: "GET_CURRENT_USER",
        user: user
    };
}