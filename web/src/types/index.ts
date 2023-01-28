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
