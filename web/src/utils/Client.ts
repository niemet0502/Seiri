import axios from "axios";
import { TOKEN_LS_KEY } from "../provider/userProvider";
import {
  CreateProject,
  CreateTaskApi,
  EditProject,
  FeatureEnum,
  IAuthLogin,
} from "../types";

export class Client {
  baseApiUrl: string = "http://localhost:3000/";

  api = axios.create({
    baseURL: this.baseApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: this.getAuthToken()
        ? `Bearer ${this.getAuthToken()}`
        : undefined,
    },
  });

  protected getAuthToken() {
    try {
      const token = localStorage.getItem(TOKEN_LS_KEY);

      return token;
    } catch (e) {
      console.log("Error with the token");
    }
  }

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

  public getProjects(feature: FeatureEnum) {
    const url = this.baseApiUrl + `project/${feature}`;

    return this.api.get(url).then((r) => r.data);
  }

  public addProject(project: CreateProject) {
    const url = this.baseApiUrl + "project";

    return this.api.post(url, project).then((r) => r.data);
  }

  public removeProject(projectId: number) {
    const url = this.baseApiUrl + `project/${projectId}`;

    return this.api.delete(url);
  }

  public editProject(data: EditProject) {
    const url = this.baseApiUrl + `project/${data.id}`;

    return this.api.patch(url, data).then((r) => r.data);
  }

  public getTasksByProject(projectId: string) {
    const url = this.baseApiUrl + `task/project/${projectId}`;

    return this.api.get(url).then((r) => r.data);
  }

  public getTask(taskId: string) {
    const url = this.baseApiUrl + `task/${taskId}`;

    return this.api.get(url).then((r) => r.data);
  }

  public createTask(data: CreateTaskApi) {
    const url = this.baseApiUrl + "task";

    return this.api.post(url, data).then((r) => r.data);
  }
}
