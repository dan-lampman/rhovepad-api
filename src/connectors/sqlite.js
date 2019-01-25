const SQLite3 = require('sqlite3');
const SQLScript = require('../../sql/sql-scripts');

class SQLite {
    constructor() {
        this.database = new SQLite3.Database(':memory:', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('SQLite database: Initialized and waiting');
            this.database.run(SQLScript.createUsersTable(), [], (err) => {
                if (err) {
                    return console.error(err.message);
                }
            });
            this.database.run(SQLScript.createMusicTable(), [], (err) => {
                if (err) {
                    return console.error(err.message);
                }
            });
            this.database.run(SQLScript.createUserMusicTable(), [], (err) => {
                if (err) {
                    return console.error(err.message);
                }

                this.database.run(SQLScript.populateMusic(), [], (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                });
            });
        });
    }

    getMusic() {
        let query = 'SELECT * FROM music;';

        return new Promise((resolve, reject) => {
            this.database.all(query, {} ,(err, rows ) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    }

    follow(userID, followerID) {
        const query =  `
            INSERT OR IGNORE INTO users (id, following_id)
            VALUES ($1, $2);
        `.trim();
        const values = [userID, followerID];

        return new Promise((resolve, reject) => {
            this.database.all(query, values ,(err, rows ) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    }

    getUsers() {
        const query =  `
            SELECT users.*, * FROM user_music
            LEFT JOIN users ON users.id = user_music.user_id
        `.trim();

        return new Promise((resolve, reject) => {
            this.database.all(query, {} ,(err, rows ) => {
                const users = {};

                if (err) {
                    reject(err);
                    return;
                }

                rows.forEach((row) => {
                    if (!users[row.user_id]) {
                        users[row.user_id] = {
                            id: row.user_id,
                            modifiedDate: row.modified_date,
                            following: [],
                            music: []
                        }
                    }

                    if (users[row.user_id].following.indexOf(row.following_id) < 0) {
                        users[row.user_id].following.push(row.following_id);
                    }

                    if (users[row.user_id].music.indexOf(row.music_id) < 0) {
                        users[row.user_id].music.push(row.music_id);
                    }
                })

                resolve(users);
            });
        });
    }

    getMusic() {
        const query =  `
            SELECT * FROM music
        `.trim();

        return new Promise((resolve, reject) => {
            this.database.all(query, {} ,(err, rows ) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    }

    listen(userID, musicID) {
        const query =  `
            INSERT OR IGNORE INTO user_music (user_id, music_id)
            VALUES ($1, $2);
        `.trim();
        const values = [userID, musicID];

        return new Promise((resolve, reject) => {
            this.database.all(query, values ,(err, rows ) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    }

    getUser(userID) {
        const query =  `
            SELECT * FROM user_music
            WHERE user_id = $1;
        `.trim();
        const values = [userID]

        return new Promise((resolve, reject) => {
            this.database.all(query, values ,(err, rows ) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    }

    getRecommendations(userID) {
        const query =  `
            SELECT user_music.music_id FROM users
            JOIN user_music ON
                (user_music.user_id = following_id OR
                    user_music.user_id IN
                        (
                            SELECT sub_users.following_id FROM users AS "sub_users"
                            WHERE sub_users.id = users.following_id
                        )
                )
            AND user_music.music_id NOT IN
                (SELECT music_id FROM user_music WHERE user_id = $1)
            AND users.id = $1;
        `.trim();
        const values = [userID]

        return new Promise((resolve, reject) => {
            const response = [];
            this.database.all(query, values ,(err, rows ) => {
                if (err) {
                    reject(err);
                    return;
                }

                rows.forEach((row) => {
                    if (response.indexOf(row.music_id) < 0) {
                        response.push(row.music_id);
                    }
                })

                resolve(response);
            });
        });
    }
}

module.exports = SQLite;

