export interface Note {
  id: number;
  title: string;
  content: string;
  description: string;
}

export interface Task {
  id: number;
  title: string;
  isDone: boolean;
  description: string;
  children?: Task[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  color: string;
  tasks: Task[];
  notes: Note[];
  isArchive: boolean;
}

export enum FeatureEnum {
  Undefined = 0,
  Task = 1,
  Note = 2,
}

export interface User {
  id: number;
  isConfirm: boolean;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}
