import { API_URL, GALLERY_URL } from ".";

export interface TaskItem {
  task_id: string;
  status: "pending" | "processing" | "done" | "failed";
  quantity: number;
  tags: string[];
  prompt: string;
  results: string[];
}

export interface GalleryItem {
  results: string[];
}

type TaskList = TaskItem[];

interface FetchTaskParams {
  task_id?: string;
}

interface CreateTaskParams {
  prompt: string;
  quantity: number;
  quality: "sm" | "md";
  orientation: "portrait" | "landscape";
}

interface CreateTaskResponse {
  msg: string;
  task_id: string;
}

export const fetchTask = async ({
  task_id,
}: FetchTaskParams): Promise<TaskItem> => {
  const res = await fetch(`${API_URL}/task/${task_id}`);
  if (!res.ok) {
    throw new Error("Tarefa não encontrada");
  }
  return res.json();
};

export const fetchAllTasks = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<TaskList> => {
  const res = await fetch(`${API_URL}/tasks?page=${pageParam}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return res.json();
};

export const fetchGallery = async (): Promise<GalleryItem> => {
  const res = await fetch(GALLERY_URL);
  if (!res.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return res.json();
};

export const createTask = async ({
  prompt,
  quantity,
  quality,
  orientation,
}: CreateTaskParams): Promise<CreateTaskResponse> => {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      quantity,
      quality,
      orientation,
    }),
  });
  if (!res.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return res.json();
};
