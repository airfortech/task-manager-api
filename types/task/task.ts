export interface NewTask extends Omit<Task, "id"> {
  id?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
}
