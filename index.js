module.exports = function(Vue) {
    Vue.directive('props', {
        bind: function () {
            var modifiers = this.modifiers;     // once, sync

            var these = this.vm;
            var child = this.el.__vue__;
            var theseProps = these._props;
            var childProps = child._props;
            var theseKeys = theseProps ? Object.keys(theseProps) : [];
            var childKeys = childProps ? Object.keys(childProps) : [];

            function update(vm, key, value) {
                let options = vm._props[key].options;

                if (options.type) {
                    var allow = false;
                    var constructor = value.constructor;
                    var typeList = options.type;

                    if (!Array.isArray(typeList)) typeList = [typeList];

                    for (let item of typeList) {
                        if (item === constructor) {
                            allow = true;
                            break;
                        }
                    }

                    if (!allow) {
                        console.warn(`Invalid property type: ${key}.`);
                        return;
                    }
                }

                if (typeof options.coerce === 'function') {
                    value = options.coerce.call(child, value);
                }

                vm[key] = value;
            }

            theseKeys.forEach(key => {
                if (~childKeys.indexOf(key)) {
                    update(child, key, these[key]);

                    if (!modifiers.once) {
                        these.$watch(key, value => {
                            update(child, key, value);
                        });
                    }

                    if (modifiers.sync) {
                        child.$watch(key, value => {
                            update(these, key, value);
                        });
                    }
                }
            });
        }
    });
};