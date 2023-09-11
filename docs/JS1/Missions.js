const add_task = document.querySelector('.js-add-task');
const todo_input_grid = document.querySelector('.todo_input_grid');
const close_window = document.querySelector('.js-close-img');
const add_to_todo_list_button = document.querySelector('.js-add-todo-button');

const savedTodoList = localStorage.getItem('todoList');
const todoList = savedTodoList ? JSON.parse(savedTodoList) : [];

const savedmissionAccomplished = localStorage.getItem('missionAccomplished');
const missionAccomplished = savedmissionAccomplished ? JSON.parse(savedmissionAccomplished) : [];

close_window.addEventListener('click', () =>visibilityHelper(true));
add_task.addEventListener('click', () =>visibilityHelper(false));
add_to_todo_list_button.addEventListener('click', () => {
    addTodo();
    visibilityHelper(true);
});

function visibilityHelper(isVisible) {
    todo_input_grid.style.visibility = isVisible ? 'hidden' : 'visible';
    add_task.style.visibility = isVisible ? 'visible' : 'hidden';
}

function addTodo() {
    const inputElement = document.querySelector('.js-mission-input');
    const dateInputElement = document.querySelector('.js-date-input');
    if (inputElement.value && dateInputElement.value) {
        todoList.push({
            mission: inputElement.value,
            date: dateInputElement.value,
            check: false
        });
        inputElement.value = '';
        dateInputElement.value = '';
        renderTodoList();
        localStorage.setItem('todoList', JSON.stringify(todoList));
    } else {
        alert('Please fill mission and date');
    }
}

function renderTodoList() {

    todoList1 = todoList.filter(item =>
        !missionAccomplished.some(x => x.mission === item.mission
            && x.date === item.date
            && x.check === item.check));
    localStorage.setItem('todoList', JSON.stringify(todoList1));
    todoList.length = 0;
    todoList1.forEach(i => todoList.push(i));

    let todoListHTML = '';
    todoList.forEach((todoObject, index) => {
        const { mission, date, check } = todoObject;
        const html = `
        <input class="mission-checkbox1" type="checkbox" ${check ? 'checked' : ''}/>
        <div class="todo-item">${mission}</div>
        <div class="todo-item">${date}</div>
        <button class="js-delete-todo-button">Delete</button>`
        todoListHTML += html;
    });
    document.querySelector('.js-to-list').innerHTML = todoListHTML;

    let missionAccomplishedListHTML = '';
    missionAccomplished.forEach(missions => {
        const { mission, date, check } = missions;
        const html = `
        <input class="mission-checkbox" type="checkbox" ${check ? 'checked' : ''}/>
        <div class="todo-item">${mission}</div>
        <div class="todo-item">${date}</div>
        <button class="js-delete-todo-button">Delete</button>`
        missionAccomplishedListHTML += html;
    });
    document.querySelector('.js-to-list1').innerHTML = missionAccomplishedListHTML;

    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            if (index >= todoList.length) {
                missionAccomplished.splice(index - todoList.length, 1);
            } else {
                todoList.splice(index, 1);
            }
            renderTodoList();
        })
    });

    document.querySelectorAll('.mission-checkbox1').forEach((check, index) => {
        check.checked = todoList[index].check;

        check.addEventListener('click', () => {
            todoList[index].check = !todoList[index].check;

            todoList.forEach(todo => {
                if (todo.check) {
                    missionAccomplished.push(todo);
                }
            });

            //localStorage.setItem('todoList', JSON.stringify(todoList));
            //localStorage.setItem('missionAccomplished', JSON.stringify(missionAccomplished));
            renderTodoList();
        });

    });

    document.querySelectorAll('.mission-checkbox').forEach((check, index) => {
        check.checked = missionAccomplished[index].check;

        check.addEventListener('click', () => {
            missionAccomplished[index].check = !missionAccomplished[index].check;

            missionAccomplished.forEach(todo => {

                if (!todo.check) {
                    todoList.push(todo);
                    console.log('hi');
                }
            });

            missionAccomplished1 = missionAccomplished.filter(x => x.check);
            missionAccomplished.length = 0;
            missionAccomplished1.forEach(i => missionAccomplished.push(i));

            //localStorage.setItem('todoList', JSON.stringify(todoList));
            //localStorage.setItem('missionAccomplished', JSON.stringify(missionAccomplished));
            renderTodoList();
        });

    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('missionAccomplished', JSON.stringify(missionAccomplished));

}

renderTodoList();
