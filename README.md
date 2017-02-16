# v-props

Vue directive for inheriting all defined props from parent component.

## Install

```bash
$ npm install v-props --save
```

## Usage

### Based on webpack

```javascript
import vProps from 'v-props';
Vue.use(vProps)
```

```html
<parent-component>
    <child-component v-props></child-component>
    <child-component v-props.once></child-component>
    <child-component v-props.sync></child-component>
</parent-component>
```

### Normal script

```html
<script src="vue.js"></script>
<script src="v-props/index.js"></script>
```

## License

MIT