
const initState = {
    pay: {

    },
    formText: ''
};

const PayReducer = (state=initState, action) => {
    switch (action.type) {
        case "CREATE_ORDER":
            return {
                ...state,
                formText: action.formText,
            };
            case "CLEAR_FORM_TEXT":
                return {
                    ...state,
                    formText: action.formText,
                };
        default:
            break;
    }
    return state;
};

export default PayReducer;