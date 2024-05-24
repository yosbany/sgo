class AuthenticatorService {
    static instance = null;
    static getInstance() {
        if (!AuthenticatorService.instance) {
            AuthenticatorService.instance = new AuthenticatorService();
        }
        return AuthenticatorService.instance;
    }
    constructor() {
        AuthenticatorService.instance = this;
    }
}

const AuthenticatorServiceInstance = AuthenticatorService.getInstance();
export default AuthenticatorServiceInstance;