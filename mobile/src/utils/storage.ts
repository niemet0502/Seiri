import * as SecureStore from 'expo-secure-store';

export const TOKEN_KEY = 'userToken';
export const USER_KEY = 'userInfo';

export const storage = {
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async setUser(user: any): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<any | null> {
    const userStr = await SecureStore.getItemAsync(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  async removeUser(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_KEY);
  },

  async clear(): Promise<void> {
    await this.removeToken();
    await this.removeUser();
  },
};
