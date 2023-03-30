import { v4 as uuidv4 } from 'uuid';
type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('list-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();
tasks.forEach((task) => {
  addListItem(task);
})

form?.addEventListener('submit', e => {
  e.preventDefault();

  if(input?.value == '' || input?.value == null) return;

  const newTask = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  
  tasks.push(newTask);
  addListItem(newTask);
  saveTasks();

})

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  })

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  form?.reset();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasksJson = localStorage.getItem('tasks');
  if(tasksJson === null) return [];
  return JSON.parse(tasksJson);
}