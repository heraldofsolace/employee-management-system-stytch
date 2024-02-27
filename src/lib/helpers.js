export const errorjsonParser = (data) => {
    let error_message;
    try {
        const parsedData = JSON.parse(data);
        error_message = parsedData.error_message;
    } catch (error) {
        error_message = data;
    }
    return error_message;
}
