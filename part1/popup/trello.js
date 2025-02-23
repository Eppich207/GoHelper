document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const addListButton = document.getElementById("add-list");

    let lists = JSON.parse(localStorage.getItem("lists")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("lists", JSON.stringify(lists));
    }

    function renderBoard() {
        board.innerHTML = "";
        lists.forEach((list, listIndex) => {
            const listEl = document.createElement("div");
            listEl.classList.add("list");
            listEl.dataset.index = listIndex;

            const listTitleContainer = document.createElement("div");
            listTitleContainer.classList.add("list-title-container");

            const titleEl = document.createElement("h3");
            titleEl.textContent = list.title;
            listTitleContainer.appendChild(titleEl);

            const deleteListButton = document.createElement("button");
            deleteListButton.textContent = "Delete List";
            deleteListButton.addEventListener("click", () => deleteList(listIndex));
            listTitleContainer.appendChild(deleteListButton);

            listEl.appendChild(listTitleContainer);

            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");
            taskContainer.dataset.listIndex = listIndex;
            taskContainer.addEventListener("dragover", (e) => e.preventDefault());
            taskContainer.addEventListener("drop", (e) => handleDrop(e, listIndex));
            
            list.tasks.forEach((task, taskIndex) => {
                const taskEl = document.createElement("div");
                taskEl.classList.add("task");
                taskEl.textContent = task;
                taskEl.draggable = true;
                taskEl.dataset.taskIndex = taskIndex;
                taskEl.dataset.listIndex = listIndex;
                taskEl.addEventListener("dragstart", handleDragStart);

                const deleteTaskButton = document.createElement("button");
                deleteTaskButton.textContent = "Delete Task";
                deleteTaskButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    deleteTask(listIndex, taskIndex);
                });
                taskEl.appendChild(deleteTaskButton);

                taskContainer.appendChild(taskEl);
            });

            listEl.appendChild(taskContainer);

            const addTaskButton = document.createElement("button");
            addTaskButton.textContent = "+ Add Task";
            addTaskButton.addEventListener("click", () => addTask(listIndex));
            listEl.appendChild(addTaskButton);
            board.appendChild(listEl);
        });

        saveToLocalStorage();
    }

    function addList() {
        const title = prompt("Enter list name:");
        if (title) {
            lists.push({ title, tasks: [] });
            renderBoard();
        }
    }

    function addTask(listIndex) {
        const task = prompt("Enter task:");
        if (task) {
            lists[listIndex].tasks.push(task);
            renderBoard();
        }
    }

    function deleteList(listIndex) {
        if (confirm("Are you sure you want to delete this list?")) {
            lists.splice(listIndex, 1);
            renderBoard();
        }
    }

    function deleteTask(listIndex, taskIndex) {
        if (confirm("Are you sure you want to delete this task?")) {
            lists[listIndex].tasks.splice(taskIndex, 1);
            renderBoard();
        }
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("taskIndex", event.target.dataset.taskIndex);
        event.dataTransfer.setData("listIndex", event.target.dataset.listIndex);
    }

    function handleDrop(event, targetListIndex) {
        const taskIndex = event.dataTransfer.getData("taskIndex");
        const sourceListIndex = event.dataTransfer.getData("listIndex");

        if (taskIndex !== null && sourceListIndex !== null) {
            const task = lists[sourceListIndex].tasks.splice(taskIndex, 1)[0];
            lists[targetListIndex].tasks.push(task);
            renderBoard();
        }
    }

    addListButton.addEventListener("click", addList);
    renderBoard();
});
