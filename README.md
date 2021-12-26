<!--
 * @Date: 2021-12-21 15:55:14
 * @LastEditTime: 2021-12-26 21:48:14
 * @FilePath: /new-simple-todo/my-todo/README.md
-->
# A todo-project..
by me and PJ \
hopefully it will be easy..
but it is impossible..
this readme is more like a diary to record the process..
will reorganize later
please go to stable branch
```
$ git checkout main
```

## frontend

in case you want some local images:
```
$ cd frontend/server
$ node server.js # start another server to provide local images
$ cd ..
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

---
**Below is just a diary please** ***ignore*** **it!!!!**
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
* ~~tired..~~
---
### Dec.22

#### frontend
* using axios to post data to the backend
* using form to collect data
#### backend
* try using mysqlmodel
```
$ poetry add sqlalchemy
$ poetry add sqlmodel
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
* rebase on sqlmodel
* sqlmodel is easier than creating a model myself.........read the wrong doc before

---
### Dec.24

#### frontend
* redraw the UI(Just add default antd.css and all is done..F**K)

#### backend
* add expire_date
* can re-render the pages every second, still cannot re-render based on events..strange
* not able to handle observer, may try listener tomorrow

---
### Dec.25

#### frontend
* draw the update drawer

#### backend
* add function to check if expired
* modify some type into enum to increase readability

---
### Dec.26

#### frontend
* add the sort buttons
* add a local images, due to chromium... build a simple server

#### backend
* no modification..开摆！