export var formatRawOption = function (option) {
    var uid = Math.random().toString(36).substr(2, 6);
    return {
        uid: uid,
        props: {
            disabled: false,
            selected: false,
            hidden: false
        },
        value: (!option || (typeof option == 'object' && Object.keys(option).length == 0)) ? '-' : option
    };
};
//# sourceMappingURL=helpers.js.map