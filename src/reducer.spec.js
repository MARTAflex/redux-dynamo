'use strict';
var expect = require('chai').expect,
    reducer = require('./reducer'),
    actions = require('./actions');

var createDummyReducer = (defaults, cases) => (state, action) => {
    state = state || { ...defaults };
    var f;
    if (f = cases[action.type]) {
        state = f(state, action);
    }
    return state;
};

var FooReducer = createDummyReducer({ count: 0}, {
    'foo/inc': (state, action) => ({
        ...state, count: state.count + 1
    })
});

var BarReducer = createDummyReducer({ count: 0}, {
    'bar/inc': (state, action) => ({
        ...state, count: state.count + 1
    })
});

describe('reducer', () => {

    it('returns default state when initializing', () => {
        var state = reducer(undefined, { type: 'foo'});
        expect(state).to.eql({ 'dynamo-reducer-registry' : {} });
    });

    it('reducers are called after setup', () => {
        var state = undefined;
        state = reducer(state, { type: '@@redux-init' });

        state = reducer(state, actions.set('foo', FooReducer));
        expect(state).to.have.property('foo');
        expect(state.foo).to.eql({ count: 0 });
    });

    it('calls registered reducers', () => {
        var state = undefined;
        state = reducer(state, actions.set('foo', FooReducer));
        state = reducer(state, actions.set('bar', BarReducer));

        state = reducer(state, { type: 'foo/inc' });
        expect(state.foo.count).to.equal(1);
        expect(state.bar.count).to.equal(0);

        state = reducer(state, { type: 'bar/inc' });
        state = reducer(state, { type: 'bar/inc' });
        expect(state.foo.count).to.equal(1);
        expect(state.bar.count).to.equal(2);
    })

});
