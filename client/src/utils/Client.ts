import axios from "axios";
import { TOKEN_LS_KEY } from "../provider/userProvider";
import {
  CreateNoteApi,
  CreateProject,
  CreateTaskApi,
  DeleteMultipleTasksApi,
  EditNoteApi,
  EditProject,
  EditTaskApi,
  FeatureEnum,
  ForgotPasswordApi,
  IAuthLogin,
  PasswordUpdateApi,
  ResetPasswordApi,
  UpdateUser,
} from "../types";

export class Client {
  baseApiUrl: string = process.env.DOMAIN as string;

  protected getAuthToken() {
    try {
      const token = localStorage.getItem(TOKEN_LS_KEY);

      return token;
    } catch (e) {
      console.log("Error with the token");
    }
  }

  protected tranformOptions() {
    const token = this.getAuthToken();

    return axios.create({
      baseURL: this.baseApiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  }

  public async AuthLogin(data: IAuthLogin) {
    const url = this.baseApiUrl + "auth/login";

    const r = await this.tranformOptions().post(url, data);
    return r.data;
  }

  public async AuthLogout() {
    const url = this.baseApiUrl + "auth/logout";

    const r = await this.tranformOptions().post(url);
    return r.data;
  }

  public async SignIn(data: IAuthLogin) {
    const url = this.baseApiUrl + "user";

    const r = await this.tranformOptions().post(url, {
      ...data,
      confirm_password: data.password,
    });
    return r.data;
  }

  public updateUser(user: UpdateUser) {
    const url = this.baseApiUrl + `user/${user.id}`;

    return this.tranformOptions()
      .patch(url, user)
      .then((r) => r.data);
  }

  public getProjects(feature: FeatureEnum) {
    const url = this.baseApiUrl + `project/${feature}`;

    return this.tranformOptions()
      .get(url)
      .then((r) => r.data);
  }

  public addProject(project: CreateProject) {
    const url = this.baseApiUrl + "project";

    return this.tranformOptions()
      .post(url, project)
      .then((r) => r.data);
  }

  public removeProject(projectId: number) {
    const url = this.baseApiUrl + `project/${projectId}`;

    return this.tranformOptions().delete(url);
  }

  public editProject(data: EditProject) {
    const url = this.baseApiUrl + `project/${data.id}`;

    return this.tranformOptions()
      .patch(url, data)
      .then((r) => r.data);
  }

  public getTasksByProject(projectId: string, showCompleted: boolean = true) {
    const url =
      this.baseApiUrl +
      `task/project/${projectId}?showCompleted=${showCompleted}`;

    return this.tranformOptions()
      .get(url)
      .then((r) => r.data);
  }

  public getTask(taskId: string) {
    const url = this.baseApiUrl + `task/${taskId}`;

    return this.tranformOptions()
      .get(url)
      .then((r) => r.data);
  }

  public createTask(data: CreateTaskApi) {
    const url = this.baseApiUrl + "task";

    return this.tranformOptions()
      .post(url, data)
      .then((r) => r.data);
  }

  public editTask(data: EditTaskApi) {
    const url = this.baseApiUrl + `task/${data.id}`;

    return this.tranformOptions()
      .patch(url, data)
      .then((r) => r.data);
  }

  public deleteTask(taskId: number) {
    const url = this.baseApiUrl + `task/${taskId}`;

    return this.tranformOptions()
      .delete(url)
      .then((r) => r.data);
  }

  public deleteMultipleTasks(data: DeleteMultipleTasksApi) {
    const url =
      this.baseApiUrl +
      `project/${data.projectId}/tasks?completed=${data.completed}`;

    return this.tranformOptions()
      .delete(url)
      .then((r) => r.data);
  }

  public getNotesByProject(projectId: string) {
    const url = this.baseApiUrl + `note/project/${projectId}`;

    return this.tranformOptions()
      .get(url)
      .then((r) => r.data);
  }

  public createNote(data: CreateNoteApi) {
    const url = this.baseApiUrl + "note";

    return this.tranformOptions()
      .post(url, data)
      .then((r) => r.data);
  }

  public getNote(id: string) {
    const url = this.baseApiUrl + `note/${id}`;

    return this.tranformOptions()
      .get(url)
      .then((r) => r.data);
  }

  public editNote(data: EditNoteApi) {
    const url = this.baseApiUrl + `note/${data.id}`;

    return this.tranformOptions()
      .patch(url, data)
      .then((r) => r.data);
  }

  public deleteNote(id: number) {
    const url = this.baseApiUrl + `note/${id}`;

    return this.tranformOptions().delete(url);
  }

  public getProject(projectId: string) {
    const url = this.baseApiUrl + `project/get/${projectId}`;

    return this.tranformOptions()
      .get(url)
      .then((r) => r.data);
  }

  public passwordUpdate(data: PasswordUpdateApi) {
    const url = this.baseApiUrl + "user/updatepassword";

    return this.tranformOptions()
      .put(url, data)
      .then((r) => r.data);
  }

  public deleteAccount() {
    const url = this.baseApiUrl + "user";

    return this.tranformOptions()
      .delete(url)
      .then((r) => r.data);
  }

  public forgotPassword(data: ForgotPasswordApi) {
    const url = this.baseApiUrl + "user/forgotpassword";

    return this.tranformOptions()
      .post(url, data)
      .then((r) => r.data);
  }

  public resetPassword(data: ResetPasswordApi) {
    const url = this.baseApiUrl + "user/resetpassword";

    return this.tranformOptions()
      .post(url, data)
      .then((r) => r.data);
  }
}
