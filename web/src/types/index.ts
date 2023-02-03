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
