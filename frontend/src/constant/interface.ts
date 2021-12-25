/*
 * @Date: 2021-12-21 21:40:04
 * @LastEditTime: 2021-12-25 16:24:54
 * @FilePath: /new-simple-todo/my-todo/frontend/src/constant/interface.ts
 */


export const TodoStatus = {
    TODO: 0,
    DONE: 1,
    EXPIRED: 2
};

export const TodoPriority = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3
};

export interface TodoItem {
    id: Number;
    title: string;
    content: string;
    status: Number;
    expire_date: string;
    priority: Number;
};
