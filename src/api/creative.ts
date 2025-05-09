import { useMutation, useQuery } from "@tanstack/react-query";
import {useState, useEffect} from "react"

const API_URL = "http://192.168.100.205:8000/api";

export interface GenerateImageRequest {
  prompt: string;
  quality?: "sm" | "md";
  orientation?: "portrait" | "landscape";
  quantity?: number;
}

export interface TaskStatus {
  status: string;
  quantity: number;
  tags: string[];
  results?: string[];
}

export interface TaskItem extends TaskStatus {
  task_id: string;
  prompt: string;
}

// Função para criar uma tarefa
export const generateImage = async (data: GenerateImageRequest) => {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return res.json();
};

// Verifica o status de uma tarefa
export const fetchTask = async ({task_id}:{task_id?: string}): Promise<TaskStatus> => {
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
}): Promise<TaskItem[]> => {
  const res = await fetch(`${API_URL}/tasks?page=${pageParam}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return res.json();
};
