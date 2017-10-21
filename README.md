# vue-element-crud

> A wrapped vue CRUD component based on the famous vue UI componets -- element-ui. [demo](https://cdn.rawgit.com/wisetc/vue-element-crud/ba84667b/index.html)

## Local development

You can download or clone this project as long as you like it. Then run npm scripts

```bash
$ npm install
$ npm run dev
```

## Usage

### Step-1, init project

You should init a vue project or take a ready one to continue as vue-loader plus babel-loader plus css-loader is required for element-ui.

```bash
$ vue init webpack <project-name>
```

### Step-2, install

This component dependent on element-ui, you should first install and import element-ui to work.

```bash
$ npm install -S element-ui vue-element-crud
```

### Step-3, use

Add these lines below to your main.js

```javascript
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import CRUD from 'vue-element-crud'

Vue.use(ElementUI)
Vue.use(CRUD)
```

### Step-4, refer to examples

You can read the docs or examples to find out how to implement this vue-element-crud props and methods.

## Contribute

If you have some thoughts on this projects, please don't hesitate to let us konw. You can make a new issue to make it better.

