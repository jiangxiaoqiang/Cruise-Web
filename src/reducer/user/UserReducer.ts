const initState = {
    user: {

    },
};

const UserReducer = (state=initState, action:any) => {
    switch (action.type) {
        case "GET_CURRENT_USER":
            return {
                ...state,
                user: action.user,
            };
        default:
            break;
    }
    return state;
};

export default UserReducer;