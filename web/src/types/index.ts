export interface User {
  id: number;
  isConfirm: boolean;
  lastname?: string;
  firstname?: string;
  email: string;
  password: string;
  avatar?: string | null;
}
export interface Note {
  id: number;
  title: string;
  content: string;
  description: string;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  isDone: boolean;
  description: string;
  children?: Task[];
  project?: Project;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  color: string;
  tasks: Task[];
  notes: Note[];
  isArchive: boolean;
  user?: User;
}

export enum FeatureEnum {
  Undefined = 0,
  Task = 1,
  Note = 2,
}

export interface IAuthLogin {
  email: string;
  password: string;
}

export interface CreateProject {
  name: string;
  description?: string;
  handledObject: FeatureEnum;
}

export interface EditProject {
  id: number;
  name: string;
  description?: string;
}

export interface CreateTaskApi {
  title: string;
  description?: string;
  projectId: string;
  parentId?: string;
}

export interface EditTaskApi {
  id: string | number;
  title?: string;
  description?: string;
  isDone?: boolean;
}

export interface CreateNoteApi {
  title: string;
  content?: string;
  projectId: string;
}

export interface EditNoteApi {
  id: string;
  title: string;
  content?: string;
}

export interface DeleteMultipleTasksApi {
  projectId: string;
  completed: boolean;
}

export interface UserFormApi {
  id?: number;
  firstname?: string;
  lastname?: string;
  newPassword?: string;
  oldPassword?: string;
  confirmPassword?: string;
  newEmail?: string;
  confirmEmail?: string;
}

export interface UpdateUser {
  id: number;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  avatar?: string | null;
}
