
const initState = {
    pay: {

    },
    formText: 'demo'
};

const PayReducer = (state=initState, action) => {
    switch (action.type) {
        case "CREATE_ORDER":
            return {
                ...state,
                formText: action.formText,
                pay: {key:1}
            };
        default:
            break;
    }
    return state;
};

export default PayReducer;