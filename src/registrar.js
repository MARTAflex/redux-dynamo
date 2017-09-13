'use strict';

var cases = {
    'redux-dynamo/set': (state, action) => ({
        ...state,
        [action.key]: action.reducer
    }),
    'redux-dynamo/remove': (state, action) => {
        var {[action.key]: deleted, ...other} = state;
        return other;
    }
};

var registrar = (state, action) => {
    var defaults = {
        // registers reducers here
        // i.e.:
        // foo: FooReducer
    };
    state = state || { ...defaults };

    var f;
    if (f = cases[action.type]) {
        state = f(state, action);
    }

    return state;
};

module.exports = registrar;
