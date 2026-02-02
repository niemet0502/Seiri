import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../config/api';
import {
    AuthResponse,
    CreateNoteApi,
    CreateProject,
    CreateTaskApi,
    DeleteMultipleTasksApi,
    EditProject,
    EditTaskApi,
    FeatureEnum,
    ForgotPasswordApi,
    IAuthLogin,
    Note,
    PasswordUpdateApi,
    ResetPasswordApi,
    UpdateUser,
} from '../types';
import { storage } from '../utils/storage';

export class ApiClient {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await storage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(data: IAuthLogin): Promise<AuthResponse> {
    const response = await this.axiosInstance.post('/auth/login', data);
    return response.data;
  }

  async logout(): Promise<void> {
    const response = await this.axiosInstance.post('/auth/logout');
    return response.data;
  }

  async signup(data: IAuthLogin): Promise<AuthResponse> {
    const response = await this.axiosInstance.post('/user', {
      ...data,
      confirm_password: data.password,
    });
    return response.data;
  }

  // User
  async updateUser(user: UpdateUser) {
    const response = await this.axiosInstance.patch(`/user/${user.id}`, user);
    return response.data;
  }

  async deleteAccount() {
    const response = await this.axiosInstance.delete('/user');
    return response.data;
  }

  async passwordUpdate(data: PasswordUpdateApi) {
    const response = await this.axiosInstance.put('/user/updatepassword', data);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordApi) {
    const response = await this.axiosInstance.post('/user/forgotpassword', data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordApi) {
    const response = await this.axiosInstance.post('/user/resetpassword', data);
    return response.data;
  }

  // Projects
  async getProjects(feature: FeatureEnum, includeArchived: boolean = false) {
    const response = await this.axiosInstance.get(
      `/projects?handledObject=${feature}&includeArchived=${includeArchived}`
    );
    return response.data;
  }

  async getProject(projectId: number) {
    const response = await this.axiosInstance.get(`/projects/${projectId}`);
    return response.data;
  }

  async createProject(project: CreateProject) {
    const response = await this.axiosInstance.post('/projects', project);
    return response.data;
  }

  async updateProject(data: EditProject) {
    const response = await this.axiosInstance.patch(`/projects/${data.id}`, data);
    return response.data;
  }

  async deleteProject(projectId: number) {
    const response = await this.axiosInstance.delete(`/projects/${projectId}`);
    return response.data;
  }

  // Tasks
  async getTasksByProject(projectId: number, showCompleted: boolean = true) {
    const response = await this.axiosInstance.get(
      `/task/project/${projectId}?showCompleted=${showCompleted}`
    );
    return response.data;
  }

  async getTask(taskId: number) {
    const response = await this.axiosInstance.get(`/task/${taskId}`);
    return response.data;
  }

  async createTask(data: CreateTaskApi) {
    const response = await this.axiosInstance.post('/task', data);
    return response.data;
  }

  async updateTask(data: EditTaskApi) {
    const response = await this.axiosInstance.patch(`/task/${data.id}`, data);
    return response.data;
  }

  async deleteTask(taskId: number) {
    const response = await this.axiosInstance.delete(`/task/${taskId}`);
    return response.data;
  }

  async deleteMultipleTasks(data: DeleteMultipleTasksApi) {
    const response = await this.axiosInstance.delete(
      `/project/${data.projectId}/tasks?completed=${data.completed}`
    );
    return response.data;
  }

  // Notes
  async getNotesByProject(projectId: number) {
    const response = await this.axiosInstance.get(`/note/project/${projectId}`);
    return response.data;
  }

  async getNote(id: number) {
    const response = await this.axiosInstance.get(`/note/${id}`);
    return response.data;
  }

  async createNote(data: CreateNoteApi) {
    const response = await this.axiosInstance.post('/note', data);
    return response.data;
  }

  async updateNote(data: Note) {
    const response = await this.axiosInstance.patch(`/note/${data.id}`, data);
    return response.data;
  }

  async deleteNote(id: number) {
    const response = await this.axiosInstance.delete(`/note/${id}`);
    return response.data;
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
