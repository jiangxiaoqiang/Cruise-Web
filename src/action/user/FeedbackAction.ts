export function submitFeedback(feedback:any) {
    return {
        type: "SUBMIT_FEEDBACK",
        feedback: feedback
    };
}