var queryString = require("query-string")
    request = require("./request"),
    helpers = require("./helpers");

module.exports = {
    getStreams: (data) => {
        return new Promise((resolve, reject) => {
            if (data && data.community_id && data.community_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many community IDs. The maximum is 100.", null));
            }
            else if (data && data.first && data.first > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too high The maximum is 100.", null));
            }
            else if (data && data.first && data.first < 0) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too low. The minimum is 1.", null));
            }
            else if (data && data.game_id && data.game_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many game IDs. The maximum is 100.", null));
            }
            else if (data && data.language && data.language.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many languages. The maximum is 100.", null));
            }
            else if (data && data.type && (data.type !== "all" && data.type !== "live" && data.type !== "vodcast")) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified an invalid type parameter. The options are 'all', 'live' or 'vodcast'.", null));
            }
            else if (data && data.user_id && data.user_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many user IDs. The maximum is 100.", null));
            }
            else if (data && data.user_login && data.user_login.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many usernames. The maximum is 100.", null));
            }
            else {
                var queries = "";
                if (data) {
                    queries = queryString.stringify({ after: data.after, before: data.before, community_id: data.community_id, first: data.first, game_id: data.game_id, language: data.language, type: data.type, user_id: data.user_id, user_login: data.user_login });
                }
                request.get("https://api.twitch.tv/helix/streams?" + queries, {}).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    },
    getStreamsMetadata: (data) => {
        return new Promise((resolve, reject) => {
            if (data && data.community_id && data.community_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many community IDs. The maximum is 100.", null));
            }
            else if (data && data.first && data.first > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too high The maximum is 100.", null));
            }
            else if (data && data.first && data.first < 0) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too low. The minimum is 1.", null));
            }
            else if (data && data.game_id && data.game_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many game IDs. The maximum is 100.", null));
            }
            else if (data && data.language && data.language.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many languages. The maximum is 100.", null));
            }
            else if (data && data.type && (data.type !== "all" && data.type !== "live" && data.type !== "vodcast")) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified an invalid type parameter. The options are 'all', 'live' or 'vodcast'.", null));
            }
            else if (data && data.user_id && data.user_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many user IDs. The maximum is 100.", null));
            }
            else if (data && data.user_login && data.user_login.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many usernames. The maximum is 100.", null));
            }
            else {
                var queries = "";
                if (data) {
                    queries = queryString.stringify({ after: data.after, before: data.before, community_id: data.community_id, first: data.first, game_id: data.game_id, language: data.language, type: data.type, user_id: data.user_id, user_login: data.user_login });
                }
                request.get("https://api.twitch.tv/helix/streams/metadata?" + queries, {}).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    }
};