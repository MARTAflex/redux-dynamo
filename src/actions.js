'use strict';
var actions = module.exports = {};

actions.set = (key, reducer) => ({
    type: 'redux-dynamo/set', key, reducer
});

actions.remove = (key) => ({
    type: 'redux-dynamo/remove', key
});
