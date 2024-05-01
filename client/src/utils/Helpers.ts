import { Task } from "../types";

export const textEllipsis = (str: string, length: number) => {
  if (!str) return "";
  if (str.length > length) {
    str = str.slice(0, length) + "...";
  }

  return str;
};

export const groupTasksByCompletedDate = (tasks: Task[]) => {
  const groupedTaks = new Map();

  for (let i = 0; i < tasks.length; i++) {
    if (groupedTaks.has(tasks[i].completedAt)) {
      groupedTaks.set(tasks[i].completedAt, [
        ...groupedTaks.get(tasks[i].completedAt),
        tasks[i],
      ]);
    } else {
      groupedTaks.set(tasks[i].completedAt, [tasks[i]]);
    }
  }

  return groupedTaks;
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
