# vue-element-crud

> A wrapped vue CRUD component based on the famous vue UI componets -- element-ui. 

Here is a simple [demo](https://rawgit.com/wisetc/vue-element-crud/master/index.html).

## Local development

You can download or clone this repository as long as you like it. Then you can run npm scripts

```bash
$ npm install
$ npm run dev
```

## Usage

### Step-1, init project

You may need to init a vue project or take a existing one to continue as vue-loader or babel-loader or css-loader is required for element-ui.

```bash
$ vue init webpack <project-name>
```

### Step-2, install

This component is dependent on element-ui, you should first install and then import element-ui to work.

```bash
$ npm install -S element-ui vue-element-crud
```

### Step-3, vue use

Add these lines below to your main.js

```javascript
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import CRUD from 'vue-element-crud'

Vue.use(ElementUI)
Vue.use(CRUD)
```

### Step-4, refer to examples

You can read the docs or examples to find out how to implement props and methods of this vue-element-crud.

## Contribute

If you have some ideas about this component, please don't hesitate to let us konw. You can make a new issue to make it better.

