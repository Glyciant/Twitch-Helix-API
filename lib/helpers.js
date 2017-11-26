module.exports = {
    generatePayload: (code, status, message, response) => {
        return {
            code: code,
            status: status,
            message: message,
            response: response
        }
    }
};