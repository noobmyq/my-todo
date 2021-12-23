<!--
 * @Date: 2021-12-21 15:55:14
 * @LastEditTime: 2021-12-23 21:10:24
 * @FilePath: /new-simple-todo/my-todo/README.md
-->
# A todo-project..
by me and PJ \
hopefully it will be easy..
but it is impossible..
this readme is more like a diary to record the process..
will reorganize later
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
---
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
* ~~how to transfer the response data of axios into typescript type????????~~(use console.log to find out the problem!!)
* tired..
---
### Dec.22

#### frontend
* using axios to post data to the backend
* using form to collect data
#### backend
* try using mysqlmodel
```
$ poetry add sqlalchemy
```
* sqlmodel can connect with backend and frontend
#### problems:
* ~~strange... onSubmit is a method described in docs... not resolved..copy and paste the node-module from a successful version~~(use onClick to substitute)
```
Type '{ children: Element; layout: "inline"; onSubmit: () => void; }' is not assignable to type 'IntrinsicAttributes & FormProps<any> & { children?: ReactNode; } & { ref?: Ref<FormInstan
```
* cannot lively update the frontend
* ugly frontend UI
* ~~not able to rebase the model on sqlmodel yet(necessary?)~~
---
### Dec.23

#### frontend
* add sider but not seems to working
#### backend
* extending current models, add status
* try rebasing on sqlmodel
* sqlmodel is easier than creating a model myself.........read the wrong doc before

