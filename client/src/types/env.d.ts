export {};

declare global {
  interface Window {
    _env_?: {
      REACT_APP_API_URL?: string;
      [key: string]: any;
    };
  }
}
