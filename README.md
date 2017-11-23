# vue-element-crud

> A wrapped vue CRUD component based on the famous vue UI componets -- element-ui. 

Here is a simple [demo](https://rawgit.com/wisetc/vue-element-crud/master/index.html).

## Local development

You can download or clone this repository as long as you like it. Then you can run npm scripts

```bash
$ npm install
$ npm run dev
```

Open a new terminal,

```bash
$ npm run build:watch
```

## Usage

You can use vue-element-crud as a vue plugin or as a vue component.

If you'd like to treat it as a componet. You can import CRUD as components.

### As component

```javascript
import { CRUD } from 'vue-element-crud'

export default {
  component: { 'crud': CRUD }
}
```
Otherwise, you can treat it as a plugin.

### As Plugin

#### Step-1, init project

You may need to init a vue project or take a existing one to continue as vue-loader or babel-loader or css-loader is required for element-ui.

```bash
$ vue init webpack <project-name>
```

#### Step-2, install

This component is dependent on element-ui, you should first install and then import element-ui to work.

```bash
$ npm install -S element-ui vue-element-crud
```

#### Step-3, vue use

Add these lines below to your main.js

```javascript
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import CRUD from 'vue-element-crud'

Vue.use(ElementUI)
Vue.use(CRUD)
```

#### Step-4, refer to examples

You can read the docs or [examples](example) to find out how to implement props and methods of this vue-element-crud.

### API

| props | type | required | default | description |
|:---:|:---:|:---:|:---:|:---:|
| data | Array | true | --- | Table data array |
| form | Object | true | --- | Form object to store form item varaibles |
| fields | Object | true | --- | Object that describes form items structure. eg. `{ name: { label: 'name' }, length: 20, type: String, options: [{ label: 'Mike', value: 'Mike' }] }` |
| rules | Object | false | --- | Object that describes form items rules. eg. `{ name: [{ required: true, message: 'name is required.' }] }` |
| editing | Boolean | true | --- | Editing status of the form wrapped dialog.|
| size | String | false | `'large'` | Size the dialog. `'full'` or `'large'` or `small` or omitted. |
| labelWidth | String | false | `'100px'` | Label width of form and table. |
| inline | Boolean | false | `false` | Determine whether form items live inline or not. |
| table | Object | false | --- | If table structure is not according to the form structure, you can specify it. eg. `{ name: 'name' }`|
| actions | Array | false | `['create', 'destroy', 'update']` | The crud actions.|
| loading | Boolean | false | `false` | CRUD is in XHR state. Submit button was disabled if true.|
| highlightCurrentRow | Boolean | false | `false` | Highlight table current row or not. |
| rowStyle | Function | false | --- | Table row style function. `Function(row, index)`|

| events | description |
|:---:|:---:|
| open | dialog open event. set `editing` to true to show the dialog. |
| close | dialog close event. set `editing` to false to close the dialog. |
| create | form create event. You need to assign form model to the `form`. |
| update | form update event. `(row, index)` passed to the handler. You need to assign row to the `form`. |
| destroy | table row destory event. `(row, index)` passed to the handler. |
| submit | form submit event. `(status)` passed to the handler. `0` stands for creating, and `1` stands for updating. |
| expand | table expand event. `(row, expanded)` passed to the handler. See element-ui table events. |
| row-click | table row click event. `(row, event, column)` passed to the handler. See element-ui table events. |
| row-dblclick | table row dblclick event. `(row, event)` passed to the handler. See element-ui table events. |

| slots | description |
|:---:|:---:|
| index | Table row index slot. See element-ui table slots. |
| expand | Table expand slot. See element-ui table slots. |
| prepend | Table prepend slot. |
| default | Table append slot. |
| addon | Form addon slot. |

Your template may look like this.

```template
<crud :data="data" :form="form" :rules="rules" :fields="fields" inline index
    :editing="editing" @open="handleOpen" @close="handleClose"
    @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"/>
```

Here is a [simple mixin](src/mixins) that may help you to bootstrap it. Just import `Simple`.

```javascript
import { Simple } from 'vue-element-crud'

export {
  mixins: [Simple]
}
```

## Contribute

If you have some ideas about this component, please don't hesitate to let us konw. You can make a new issue to make it better.
