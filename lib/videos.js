var queryString = require("query-string")
    request = require("./request"),
    helpers = require("./helpers");

module.exports = {
    getVideos: (data) => {
        return new Promise((resolve, reject) => {
            if (!data || ((!data.id || data.id.length === 0) && (!data.user_id || data.user_id.length === 0)) && (!data.game_id || data.game_id.length === 0)) {
                resolve(helpers.generatePayload(400, "bad_request", "You must specify a video ID, user ID or game ID.", null));
            }
            else if (data.id && data.id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many video IDs. The maximum is 1.", null));
            }
            else if (data.user_id && data.user_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many user IDs. The maximum is 100.", null));
            }
            else if (data.game_id && data.game_id.length > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many game IDs. The maximum is 100.", null));
            }
            else if (data && data.first && data.first > 100) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too high The maximum is 100.", null));
            }
            else if (data && data.first && data.first < 0) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified a first parameter that is too low. The minimum is 1.", null));
            }
            else if (data && data.language && data.language.length > 1) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many languages. The maximum is 1.", null));
            }
            else if (data && data.language && data.language.length > 1) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified too many languages. The maximum is 1.", null));
            }
            else if (data && data.period && (data.period !== "all" && data.period !== "day" && data.period !== "month" && data.period !== "week")) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified an invalid period parameter. The options are 'all', 'day', 'month' or 'week'.", null));
            }
            else if (data && data.sort && (data.sort !== "time" && data.sort !== "trending" && data.sort !== "views")) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified an invalid sort parameter. The options are 'time', 'trending', or 'views'.", null));
            }
            else if (data && data.type && (data.type !== "all" && data.type !== "upload" && data.type !== "archive" && data.type !== "highlight")) {
                resolve(helpers.generatePayload(400, "bad_request", "You have specified an invalid type parameter. The options are 'all', 'upload', 'archive', or 'highlight'.", null));
            }
            else {
                queries = queryString.stringify({ id: data.id, user_id: data.user_id, game_id: data.game_id, first: data.first, language: data.language, period: data.period, sort: data.sort, type: data.type });
                request.get("https://api.twitch.tv/helix/videos?" + queries, {}).then(function(data) {
                    resolve(helpers.generatePayload(200, "success", "OK", data));
                });
            }
        });
    }
};