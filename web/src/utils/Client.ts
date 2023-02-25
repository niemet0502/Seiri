import axios from "axios";
import { IAuthLogin } from "../types";

export class Client {
  baseApiUrl: string = "http://localhost:3000/";

  api = axios.create({
    baseURL: this.baseApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer secreat",
    },
  });

  public async AuthLogin(data: IAuthLogin) {
    const url = this.baseApiUrl + "auth/login";

    const r = await this.api.post(url, data);
    return r.data;
  }

  public async SignIn(data: IAuthLogin) {
    const url = this.baseApiUrl + "user";

    const r = await this.api.post(url, {
      ...data,
      confirm_password: data.password,
    });
    return r.data;
  }
}
