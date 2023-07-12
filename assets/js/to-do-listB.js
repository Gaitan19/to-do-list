let elements = document.getElementById("contElements");
let input = document.getElementById("inputText");
let list = document.getElementById("list");
let listNum = 0;
let backColor = 2;
let muestra;

// Cargar las tareas guardadas del almacenamiento local al iniciar la página

window.addEventListener('load', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    savedTasks.forEach(task => {
      let listElement = createListElement(task.text, task.completed);
      list.appendChild(listElement);
      listNum++;
      contTask();
      if (backColor === 2) {
        backColor = 3;
      } else {
        backColor = 2;
      }
    });
    muestra = savedTasks;
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (input.value && input.value.length > 1) {
      if (input.classList.contains('editing')) {
        const editingTaskId = parseInt(input.getAttribute('data-task-id'));
        updateList(editingTaskId, input.value);
      } else {
        addList();

      }
    } else {
      alert("Please enter a task");
    }
  }
});

addList = () => {
  let inputText = filterList(input.value);
  if (inputText) {
    let listElement = createListElement(inputText);
    list.appendChild(listElement);
    input.value = "";
    listNum++;
    contTask();
    if (backColor === 2) {
      backColor = 3;
    } else {
      backColor = 2;
    }
    saveTasksToLocalStorage();
  }
};

createListElement = (text, completed = false) => {
  let listItemClass = backColor % 2 === 0 ? 'To-do-list-group-gray' : 'To-do-list-group-white';

  let listElement = document.createElement('li');
  listElement.setAttribute('class', `list-group-item To-do-list-group-item ${listItemClass}`);
  listElement.setAttribute('id', `list${listNum}`);

  let listItemContent = `
    <div class="form-check">
      <input class="form-check-input To-do-list-check ${mode === 'dark' ? 'dark-mode-checkBox' : ''}" type="checkbox" id="flexCheckDefault${listNum}" ${completed ? 'checked' : ''} onchange="toggleTask(this)">
      <label class="form-check-label To-do-list-text ${completed ? 'completed' : ''} ${mode === 'dark' ? 'dark-mode-text' : ''}" id="text${listNum}">${text}</label>
    </div>
    <div class="To-do-list-group-buttons">
      <button type="button" class="btn btn-success To-do-list-button ${mode === 'dark' ? 'dark-mode-btn' : ''}" onclick="editList(${listNum})">
        <span class="fa-solid fa-pen-to-square To-do-list-button-icon"></span>
      </button>
      <button type="button" class="btn btn-danger To-do-list-button" onclick="deleteList(${listNum})">
        <span class="fa-sharp fa-solid fa-trash To-do-list-button-icon"></span>
      </button>
    </div>
  `;

  listElement.innerHTML = listItemContent;

  if (mode === 'dark') {
    listElement.classList.add('dark-mode-group-gray');
    if (listItemClass === 'To-do-list-group-white') {
      listElement.classList.add('dark-mode-group-white');
    }
  }

  return listElement;
};

filterList = (x) => {
  if (x) {
    if (x.length > 1 && x.length <= 44) {
      return x;
    } if (x.length < 1) {
      alert("Please enter a task");
    } else {
      alert("the task must have less than 45 characters");
    }
  } else {
    return false;
  }
};

editList = (listId) => {
  let currentText = document.getElementById(`text${listId}`);
  let currentTextInput = document.createElement('input');
  currentTextInput.value = currentText.textContent;
  currentTextInput.classList.add('To-do-list-input'); // Agregar la clase de estilo
  currentTextInput.classList.add('To-do-list-input-edit'); // Agregar la clase de estilo
  if (mode === 'dark') {
    // currentTextInput.style.color = '#fff';
    currentTextInput.classList.add("dark-mode-text");
  } else {
    // currentTextInput.style.color = '#333';
    currentTextInput.classList.remove("dark-mode-text");

  }

  currentText.replaceWith(currentTextInput);
  currentTextInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      let newText = filterList(currentTextInput.value);
      if (newText) {
        currentTextInput.replaceWith(currentText);
        updateList(listId, newText);
      }
    }
  });

  
};

updateList = (listId, newText) => {
  if (newText && newText.length > 1) {
    let currentText = document.getElementById(`text${listId}`);
    currentText.textContent = newText;
    if (mode === 'dark') {
      currentText.classList.add("dark-mode-text");
    } else {
      currentText.classList.remove("dark-mode-text");
    }
    saveTasksToLocalStorage();
  } else {
    alert("Please enter a task");
  }
};

deleteList = (listId) => {
  let current = document.getElementById(`text${listId}`).innerHTML;
  let c = document.getElementById(`list${listId}`);
  c.parentNode.removeChild(c);
  contTask();
  saveTasksToLocalStorage();
};

contTask = () => {
  let taskElements = list.querySelectorAll('li');
  let numTask = taskElements.length;

  elements.value = "";
  elements.textContent = `Todos (${numTask})`;
};

saveTasksToLocalStorage = () => {
  const tasks = [];
  const taskElements = list.querySelectorAll('.To-do-list-text');
  taskElements.forEach(taskElement => {
    const task = {
      text: taskElement.textContent,
      completed: taskElement.classList.contains('completed')
    };
    tasks.push(task);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

toggleTask = (checkbox) => {
  let label = checkbox.nextElementSibling;
  label.classList.toggle('completed');
  saveTasksToLocalStorage();
};