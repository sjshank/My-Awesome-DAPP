const TodoList = artifacts.require("TodoList");

contract('TodoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed();
    });

    it("Should deploy successfull", () => {
        assert(this.todoList.address !== '');
    });
    it("Should create initial task", async () => {
        const taskCount = await this.todoList.taskCount();
        const _task = await this.todoList.taskList(taskCount);
        assert.equal(taskCount, 1);
        assert.equal(_task.completed, true);
    });
    it("Should create task", async () => {
        const result = await this.todoList.createTask("New task");
        const taskCount = await this.todoList.taskCount();
        assert.equal(taskCount, 2);
        const _eventObj = result.logs[0].args;
        assert.equal(_eventObj.content, "A New task");
        assert.equal(_eventObj.completed, false);
    });
    it("Should toggle task status", async () => {
        const result = await this.todoList.toggleStatus(1, true);
        const _task = await this.todoList.taskList(1);
        assert.equal(_task.id, 1);
        const _eventObj = result.logs[0].args;
        assert.equal(_eventObj.completed, true);
        const result1 = await this.todoList.toggleStatus(1, false);
        const _task1 = await this.todoList.taskList(1);
        const _eventObj1 = result1.logs[0].args;
        assert.equal(_eventObj1.completed, false);
    });

});