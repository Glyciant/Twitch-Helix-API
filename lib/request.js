var restler = require("restler"),
    index = require("../index");

module.exports = {
    get: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.get(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + data.token || ""
                }
            }).on("complete", function(data) {
                resolve(data);
            });
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.post(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + data.token || ""
                },
                data: data
            }).on("complete", function(data) {
                resolve(data);
            });
        });
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.put(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + data.token || ""
                },
                data: data
            }).on("complete", function(data) {
                resolve(data);
            });
        });
    },
    getLegacy: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.get(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Content-Type": "application/json",
                    "Authorization": "OAuth " + data.token || ""
                }
            }).on("complete", function(data) {
                resolve(data);
            });
        });
    },
    postLegacy: (url, data) => {
        return new Promise((resolve, reject) => {
            restler.post(url, {
                headers: {
                    "Client-ID": index.clientID,
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Content-Type": "application/json",
                    "Authorization": "OAuth " + data.token || ""
                },
                data: data
            }).on("complete", function(data) {
                resolve(data);
            });
        });
    }
}