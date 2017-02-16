# v-props

Vue directive for inheriting all defined props from parent component.

## Install

```bash
$ npm install v-props --save
```

## Usage

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

## License

MIT