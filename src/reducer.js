'use strict';
var omit = require('lodash/omit'),
    pick = require('lodash/pick'),
    keys = require('lodash/keys'),
    combine = require('redux').combineReducers,
    registrar = require('./registrar');

var DRR = 'dynamo-reducer-registry';

var reducer = (state, action) => {
    state = state || {};

    // call the registrar reducer with the registry slice of the state
    state = {
        ...state,
        ...combine({ [DRR]: registrar })(pick(state, DRR), action)
    }

    // call the registered reducers with their slices
    var registry = state[DRR] || {},
        ks = keys(registry);
    if (ks.length) {
        state = {
            ...state,
            ...combine(registry)(omit(state, DRR), action)
        };
    }

    return state;
};

module.exports = reducer;
