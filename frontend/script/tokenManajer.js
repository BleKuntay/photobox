// tokenManager.js
class TokenManager {
    constructor() {
        if (TokenManager.instance) {
            return TokenManager.instance;
        }
        this.token = null;
        TokenManager.instance = this;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    clearToken() {
        this.token = null;
    }
}

// Instantiate the singleton
const tokenManager = new TokenManager();
Object.freeze(tokenManager);

export default tokenManager;
