
export function getDecimalFromFlaskResponse(response) {
    let val = response.substring(
        response.lastIndexOf("mal(") + 5,
        response.lastIndexOf(")") - 3
    );
    return parseFloat(val);
};