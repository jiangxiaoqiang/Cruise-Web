const initState = {
    feedback: {

    },
};

const FeedbackReducer = (state=initState, action:any) => {
    switch (action.type) {
        case "SUBMIT_FEEDBACK":
            return {
                ...state,
                feedback: action.feedback,
            };
        default:
            break;
    }
    return state;
};

export default FeedbackReducer;