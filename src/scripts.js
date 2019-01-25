const followsJSON = require('./../follows.json');
const listenJSON = require('./../listen.json');
const request = require('request-promise');

function Scripts() {}

Scripts.generateFollowers = () => {
    const promises = [];
    const operations = followsJSON.operations;

    return new Promise((resolve, reject) => {
        for(let i = 0; i < operations.length; i ++) {
            const userID = operations[i][0];
            const followingID = operations[i][1];
            const options = {
                method: 'POST',
                uri: 'http://localhost:3000/rhovepad-api/user/follow',
                body: {
                    from: userID,
                    to: followingID,
                },
                json: true,
            };

            promises.push(request(options));
        };

        Promise.all(promises).then((response) => {
            const message = 'Successfully loaded user relationship data';
            resolve({
                success: true,
                message,
            });
        }).catch((error) => {
            reject(error);
        })
    })

}

Scripts.generateListens = () => {
    const promises = [];
    const userIDs = listenJSON.userIds;

    return new Promise((resolve, reject) => {
        for (let key in userIDs) {
            let values = userIDs[key];

            values.forEach((value) => {
                const options = {
                    method: 'POST',
                    uri: 'http://localhost:3000/rhovepad-api/user/listen',
                    body: {
                        user: key,
                        music: value,
                    },
                    json: true,
                };

                promises.push(request(options));
            });
        };

        Promise.all(promises).then((response) => {
            const message = 'Successfully loaded user music data';
            resolve({
                success: true,
                message,
            });
        }).catch((error) => {
            reject(error);
        })
    })

}


module.exports = Scripts;