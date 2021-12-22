<!--
 * @Date: 2021-12-21 15:55:14
 * @LastEditTime: 2021-12-22 11:06:16
 * @FilePath: /new-simple-todo/my-todo/README.md
-->
# A todo-project..
by me and PJ \
hopefully it will be easy..
but it is impossible..
this readme is more like a diary to record the process..

## frontend
```
$ cd frontend
$ npm install
$ npm start
```

## backend
```
$ cd backend
$ poetry install
$ poetry run python -m mytodo serve --debug
```
please go to http://127.0.0.1:8000
## start at Dec.21..

* please make sure your environment is correct
* detailed requirement please refer to [here](https://github.com/joint-online-judge/simple-todo/blob/main/)

### Dec.21:

#### frontend
* build a structure of the front & backend using react.js
```
$ npx create-react-app frontend --template typescript
$ cd frontend
$ npm install mobx-react --save    
$ npm install antd --save       
```
* use the structure to create a webpage that can access..

#### backend
* use poetry to init and add dependencies
```
$ poetry init
$ poetry add [dependency]
```

#### problems:
* ~~~how to transfer the response data of axios into typescript type????????~~~
* tired..

#### update at 12:31a.m.
* use console.log to find out the problem!! 

### Dec.22

#### frontend
* using axios to post data to the backend

#### backend

#### problems:
* strange... onSubmit is a method described in docs... not resolved..copy and paste the node-module from a successful version
```
Type '{ children: Element; layout: "inline"; onSubmit: () => void; }' is not assignable to type 'IntrinsicAttributes & FormProps<any> & { children?: ReactNode; } & { ref?: Ref<FormInstan
```
