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
                var options = vm._props[key].options;

                if (options.type) {
                    var allow = false;
                    var constructor = value.constructor;
                    var typeList = options.type;

                    if (!Array.isArray(typeList)) typeList = [typeList];

                    for (var i=0;i<typeList.length;i++) {
                        var item = typeList[i];
                        if (item === constructor) {
                            allow = true;
                            break;
                        }
                    }

                    if (!allow) {
                        console.warn('Invalid property type: ' + key + '.');
                        return;
                    }
                }

                if (typeof options.coerce === 'function') {
                    value = options.coerce.call(child, value);
                }

                vm[key] = value;
            }

            theseKeys.forEach(function(key) {
                if (~childKeys.indexOf(key)) {
                    update(child, key, these[key]);

                    if (!modifiers.once) {
                        these.$watch(function(key, value) {
                            update(child, key, value);
                        });
                    }

                    if (modifiers.sync) {
                        child.$watch(function(key, value) {
                            update(these, key, value);
                        });
                    }
                }
            });
        }
    });
};