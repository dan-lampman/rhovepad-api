const SqlConnector = require('../connectors/sqlite');
const database = new SqlConnector();
const Rhovepad = {};

Rhovepad.follow = (userID, followingID) => {
    return new Promise((resolve, reject) => {
        if (!userID || !followingID) {
            reject('Missing parameters');
            return;
        }

        database.follow(userID, followingID).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
};

Rhovepad.getUsers = () => {
    return new Promise((resolve, reject) => {
        database.getUsers().then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
};

Rhovepad.getUser = (userID) => {
    return new Promise((resolve, reject) => {
        if (!userID) {
            reject('Missing parameter: userID');
            return;
        }

        database.getUser(userID).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
};

Rhovepad.listen = (userID, musicID) => {
    return new Promise((resolve, reject) => {
        if (!userID || !musicID) {
            reject('Missing parameters');
            return;
        }

        database.listen(userID, musicID).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
};

Rhovepad.getMusic = () => {
    return new Promise((resolve, reject) => {
        database.getMusic().then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    })
};

Rhovepad.getRecommendations = (userID) => {
    return new Promise((resolve, reject) => {
        if (!userID) {
            reject('Missing parameter: userID');
            return;
        }

        database.getRecommendations(userID).then((response) => {
            resolve({
                list: response
            });
        }).catch((error) => {
            reject(error);
        });
    })
};

module.exports = Rhovepad;