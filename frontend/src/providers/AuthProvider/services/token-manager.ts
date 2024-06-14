export class TokenManager {
  private static readonly TOKEN_KEY = 'access_token';

  static getToken() {
    return localStorage.getItem(TokenManager.TOKEN_KEY);
  }

  static setToken(token: string, { onSet = () => {} } = {}) {
    localStorage.setItem(TokenManager.TOKEN_KEY, token);
    onSet();
  }

  static removeToken({ onRemove = () => {} }) {
    localStorage.removeItem(TokenManager.TOKEN_KEY);
    onRemove();
  }

  static hasToken() {
    return !!TokenManager.getToken();
  }
}
