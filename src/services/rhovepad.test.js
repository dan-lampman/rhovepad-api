const rhovepad = require('./rhovepad');
const mockedDatabase = require('../connectors/sqlite');

jest.mock('../connectors/sqlite');

describe('Rhovepad Service', () => {
    it('should be defined', () => {
        expect(rhovepad).toBeDefined();
    });

    describe('follow', () => {
        it('should be defined', () => {
            expect(rhovepad.follow).toBeDefined();
        });

        it('should return an error if userID is not provided', () => {
            const userID = null;
            const followingID = 1;

            rhovepad.follow(userID, followingID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return an error if followingID is not provided', () => {
            const userID = 1;
            const followingID = null;

            rhovepad.follow(userID, followingID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return an error if the database returns an error', () => {
            const userID = 1;
            const followingID = 2;

            mockedDatabase.prototype.follow.mockImplementation(() => {
                return new Promise((reject) => {
                    reject('some error');
                })
            });

            rhovepad.follow(userID, followingID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return data on success', () => {
            const userID = 1;
            const followingID = 2;
            const data = 'some data';

            mockedDatabase.prototype.follow.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve(data);
                })
            });

            rhovepad.follow(userID, followingID).then((response) => {
                expect(response).toBeDefined();
                expect(response).toEqual(data);
            });
        });
    });

    describe('getUsers', () => {
        it('should be defined', () => {
            expect(rhovepad.follow).toBeDefined();
        });

        it('should return an error if the database returns an error', () => {
            mockedDatabase.prototype.getUsers.mockImplementation(() => {
                return new Promise((reject) => {
                    reject('some error');
                })
            });

            rhovepad.getUsers().catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return data on success', () => {
            const data = 'some data';

            mockedDatabase.prototype.getUsers.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve(data);
                })
            });

            rhovepad.getUsers().then((response) => {
                expect(response).toBeDefined();
                expect(response).toEqual(data);
            });
        });
    });

    describe('getUser', () => {
        it('should be defined', () => {
            expect(rhovepad.getUser).toBeDefined();
        });

        it('should return an error if userID is not provided', () => {
            const userID = null;

            rhovepad.getUser(userID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return an error if the database returns an error', () => {
            const userID = 1;

            mockedDatabase.prototype.getUser.mockImplementation(() => {
                return new Promise((reject) => {
                    reject('some error');
                })
            });

            rhovepad.follow(userID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return data on success', () => {
            const userID = 1;
            const data = 'some data';

            mockedDatabase.prototype.getUser.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve(data);
                })
            });

            rhovepad.getUser(userID).then((response) => {
                expect(response).toBeDefined();
                expect(response).toEqual(data);
            });
        });
    });

    describe('listen', () => {
        it('should be defined', () => {
            expect(rhovepad.listen).toBeDefined();
        });

        it('should return an error if userID is not provided', () => {
            const userID = null;
            const musicID = 1;

            rhovepad.listen(userID, musicID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return an error if followingID is not provided', () => {
            const userID = 1;
            const musicID = null;

            rhovepad.listen(userID, musicID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return an error if the database returns an error', () => {
            mockedDatabase.prototype.listen.mockImplementation(() => {
                return new Promise((reject) => {
                    reject('some error');
                })
            });

            rhovepad.listen().catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return data on success', () => {
            const data = 'some data';
            const userID = 1;
            const musicID = 10;

            mockedDatabase.prototype.listen.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve(data);
                })
            });

            rhovepad.listen(userID, musicID).then((response) => {
                expect(response).toBeDefined();
                expect(response).toEqual(data);
            });
        });
    });

    describe('getMusic', () => {
        it('should be defined', () => {
            expect(rhovepad.getMusic).toBeDefined();
        });

        it('should return an error if the database returns an error', () => {
            mockedDatabase.prototype.getMusic.mockImplementation(() => {
                return new Promise((reject) => {
                    reject('some error');
                })
            });

            rhovepad.getMusic().catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return data on success', () => {
            const data = 'some data';

            mockedDatabase.prototype.getMusic.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve(data);
                })
            });

            rhovepad.getMusic().then((response) => {
                expect(response).toBeDefined();
                expect(response).toEqual(data);
            });
        });
    });

    describe('getRecommendations', () => {
        it('should be defined', () => {
            expect(rhovepad.getRecommendations).toBeDefined();
        });

        it('should return an error if userID is not provided', () => {
            const userID = null;

            rhovepad.getRecommendations(userID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return an error if the database returns an error', () => {
            const userID = 1;

            mockedDatabase.prototype.getRecommendations.mockImplementation(() => {
                return new Promise((reject) => {
                    reject('some error');
                })
            });

            rhovepad.getRecommendations(userID).catch((error) => {
                expect(error).toBeDefined();
            });
        });

        it('should return data on success', () => {
            const userID = 1;
            const data = 'some data';

            mockedDatabase.prototype.getRecommendations.mockImplementation(() => {
                return new Promise((resolve) => {
                    resolve(data);
                })
            });

            rhovepad.getRecommendations(userID).then((response) => {
                expect(response).toBeDefined();
                expect(response.list).toEqual(data);
            });
        });
    });
});