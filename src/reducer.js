'use strict';
var omit = require('lodash/omit'),
    pick = require('lodash/pick'),
    keys = require('lodash/keys'),
    combine = require('redux').combineReducers,
    registrar = require('./registrar');

var DRR = 'dynamo-reducer-registry',
    // FIXME: we temporarily replace redux combineReducers
    // with this lazy combine til we figure out that using
    // reducers like mixins is a bad idea
    lazyCombine = (reducers) => (state, action) => {
        state = state || {};
        Object.keys(reducers).forEach((key) => {
            state = { ...state, [key]: reducers[key](state[key], action)}
        });
        return state;
    };

var reducer = (state, action) => {
    state = state || {};

    // call the registrar reducer with the registry slice of the state
    state = {
        ...state,
        ...lazyCombine({ [DRR]: registrar })(pick(state, DRR), action)
    }

    // call the registered reducers with their slices
    var registry = state[DRR] || {},
        ks = keys(registry);
    if (ks.length) {
        state = {
            ...state,
            ...lazyCombine(registry)(omit(state, DRR), action)
        };
    }

    return state;
};

module.exports = reducer;
