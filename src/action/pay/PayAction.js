export function createOrder(formText) {
    return {
        type: "CREATE_ORDER",
        formText: formText
    };
}

export function clearFormText() {
    return {
        type: "CLEAR_FORM_TEXT",
        formText: ''
    };
}
  