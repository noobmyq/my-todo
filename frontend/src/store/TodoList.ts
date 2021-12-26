import { action, computed, observable } from 'mobx';
import { message } from 'antd';
import provider from 'Todos';
import { ITodoItem } from '../constant/Interface';
import { TodoPriority, TodoStatus } from '../constant/params';
import { AxiosResponse } from "axios";

const checkExpired = (todo: ITodoItem): boolean => {
  const now = new Date();
  const expire_date = new Date(Date.parse(todo.expire_date));
  return expire_date < now;
};

class AllTodoList {
  @observable todoList: ITodoItem[] = [];
  @observable showType: string = 'undone';
  @observable detailModalVisible: boolean = false;
  @observable editingTodo: ITodoItem | null = null;

  @computed get undoneTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return (todo.status === TodoStatus.UNDONE) &&
        !checkExpired(todo);
    });
  }

  @computed get doneTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return todo.status === TodoStatus.DONE;
    });
  }

  @computed get expiredTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return (todo.status === TodoStatus.UNDONE) &&
        checkExpired(todo);
    });
  }

  @computed get showTodoList(): ITodoItem[] {
    if (this.showType === 'undone') return this.undoneTodoList;
    if (this.showType === 'done') return this.doneTodoList;
    if (this.showType === 'expired') return this.expiredTodoList;
    return this.todoList;
  }

  @action fetchTodoList = (): void => {
    provider.getInstance().get('/todos/')
      .then((response: AxiosResponse) => {
        this.todoList = response.data;
      })
      .catch(() => {
        message.error("Fail to fetch！");
      })
  };

  //sort function
  @action sortByPriority = (): void => {
    this.todoList = this.todoList.slice().sort((a, b): number => {
      return a.priority - b.priority;
    })
  };

  @action sortByExpireDate = (): void => {
    this.todoList = this.todoList.slice().sort((a, b): number => {
      const date1 = Date.parse(a.expire_date);
      const date2 = Date.parse(b.expire_date);
      return date1 - date2;
    });
  };

  @action updateEditingTodoItem = (todo: object) => {
    return provider.getInstance().patch(`/todos/${this.editingTodo?.id}/`, todo)
      .then(() => {
        this.closeDetailModal();
        this.fetchTodoList();
        message.success('Update successfully！');
      })
      .catch(() => {
        message.error('Fail to update！');
      })
  };

  @action deleteTodoItem = (todo: ITodoItem) => {
    return provider.getInstance().delete(`/todos/${todo.id}/`)
      .then(() => {
        this.fetchTodoList();
        message.success('Delete successfully！');
      })
      .catch(() => {
        message.error('Fail to delete！');
      })
  };

  @action markAsDone = (todo: ITodoItem) => 
    {return provider.getInstance().patch(`/todos/${todo.id}/`,
      { status: TodoStatus.DONE })
      .then(() => {
        this.fetchTodoList();
        message.success('Finish TodoItem successfully！');
      })
      .catch(() => {
        message.error('Fail to finish TodoItem！');
      })
  };

  @action quickCreateTodo = (title: string): void => {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    let todo: ITodoItem = {
      title: title,
      content: '',
      status: TodoStatus.UNDONE,
      priority: TodoPriority.CASUAL,
      expire_date: nextDay.toISOString()
    };
    provider.getInstance().post('/todos/', todo)
      .then(() => {
        this.fetchTodoList();
        message.success('Create TodoItem successfully！');
      })
      .catch(() => {
        message.error('Fail to create TodoItem！');
      })
  };

  @action showDetailModal = (todo: ITodoItem): void => {
    this.editingTodo = todo;
    this.detailModalVisible = true;
  };

  @action closeDetailModal = (): void => {
    this.detailModalVisible = false;
    this.editingTodo = null;
  };
}

const todoList = new AllTodoList();

export default todoList;
