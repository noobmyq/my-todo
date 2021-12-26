/*
 * @Date: 2021-12-21 21:40:04
 * @LastEditTime: 2021-12-26 10:31:46
 * @FilePath: /new-simple-todo/my-todo/frontend/src/constant/interface.ts
 */

export const TodoSort = {
    BYPRIORITY: 0,
    BYEXPIREDATE: 1,
    BYCREATEDATE: 2
}

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
    id: number;
    title: string;
    content: string;
    status: number;
    expire_date: string;
    priority: number;
};
