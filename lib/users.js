var queryString = require("query-string"),
    request = require("./request"),
    helpers = require("./helpers");

module.exports = {
    getUsers: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || ((!data.id || data.id.length === 0) && (!data.login || data.login.length === 0))) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a user ID or username.", null));
            }
            else if (data.id && data.id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many user IDs. The maximum is 100.", null));
            }
            else if (data.login && data.login.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many usernames. The maximum is 100.", null));
            }
            else {
                queries = queryString.stringify({ id: data.id, login: data.login });
                request.get("https://api.twitch.tv/helix/users?" + queries, {}).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    },
    getUsersFollows: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || (!data.from_id && !data.to_id)) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a from_id or to_id.", null));
            }
            else if (data.first && data.first > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too high The maximum is 100.", null));
            }
            else if (data.first && data.first < 0) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too low. The minimum is 1.", null));
            }
            else {
                queries = queryString.stringify({ from_id: data.from_id, to_id: data.to_id, first: data.first, after: data.after, before: data.before });
                request.get("https://api.twitch.tv/helix/users/follows?" + queries, {}).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    },
    updateUser: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || !data.token) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify an authorization token.", null))
            }
            else if (!data.description) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a user description.", null))
            }
            else {
                queries = queryString.stringify({ description: data.description });
                request.put("https://api.twitch.tv/helix/users?" + queries, { token: data.token }).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    }
};