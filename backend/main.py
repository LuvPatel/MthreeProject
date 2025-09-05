from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://luvpatel.github.io/"],  # Specific to React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory storage (or load from JSON)
TASKS_FILE = 'tasks.json'
tasks = []

if os.path.exists(TASKS_FILE):
    with open(TASKS_FILE, 'r') as f:
        tasks = json.load(f)

# Input model for POST and PUT (only requires description)
class TaskCreate(BaseModel):
    description: str

# Output/response model
class Task(BaseModel):
    id: int
    description: str
    done: bool = False

# Helper to save tasks
def save_tasks():
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f)

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return tasks

@app.post("/tasks", response_model=Task)
def add_task(task: TaskCreate):  # Use TaskCreate for input
    print("Received POST request with task:", task)  # Debug log
    new_id = len(tasks) + 1
    new_task = {"id": new_id, "description": task.description, "done": False}
    tasks.append(new_task)
    save_tasks()
    print("Tasks after append:", tasks)  # Debug log
    return new_task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskCreate):
    for t in tasks:
        if t["id"] == task_id:
            t["description"] = task.description
            save_tasks()
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    save_tasks()
    return {"detail": "Task deleted"}