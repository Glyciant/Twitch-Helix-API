var queryString = require("query-string")
    request = require("./request"),
    helpers = require("./helpers");

module.exports = {
    getAccessToken: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || !data.client_secret) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a client secret.", null))
            }
            else if (!data.redirect_uri) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a redirect URI.", null))
            }
            else if (!data.code) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify an authorization code.", null))
            }
            else {
                queries = queryString.stringify({ client_id: data.client_id, client_secret: data.client_secret, redirect_uri: data.redirect_uri, code: data.code, state: data.state, grant_type: "authorization_code" });
                request.postLegacy("https://api.twitch.tv/kraken/oauth2/token?" + queries, {}).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    },
    checkToken: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || !data.token) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify an authorization token.", null))
            }
            else {
                request.getLegacy("https://api.twitch.tv/kraken", { token: data.token }).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    }
}