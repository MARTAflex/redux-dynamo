'use strict';
var expect = require('chai').expect,
    registrar = require('./registrar'),
    actions = require('./actions');

describe('registrar', () => {

    it('returns default state when initializing', () => {
        var state = registrar(undefined, { type: 'foo'});
        expect(state).to.eql({});
    });

    it('adds given reducer to registry', () => {
        var state = {};

        var next = registrar(state, actions.set('foo', () => ( 'bar' )));
        expect(next).to.not.equal(state); // same object in terms of object id
        expect(next).to.have.property('foo');
        expect(next.foo()).to.equal('bar');
    });

    it('removes reducer by key', () => {
        var state = { foo: () => ('bar') };

        var next = registrar(state, actions.remove('foo'));
        expect(next).to.not.equal(state); // same object in terms of object id
        expect(next).to.eql({});
    });

    it('works when adding/removing multiple reducers', () => {
        var state = {};

        state = registrar(state, actions.set('2B', () => ( 'hello' )));
        expect(state).to.have.property('2B');
        expect(Object.keys(state)).to.have.length(1);

        state = registrar(state, actions.set('9S', () => ( 'there' )));
        expect(state).to.have.property('2B');
        expect(state).to.have.property('9S');
        expect(Object.keys(state)).to.have.length(2);

        state = registrar(state, actions.remove('2B'));
        expect(state).to.have.property('9S');
        expect(Object.keys(state)).to.have.length(1);

        state = registrar(state, actions.remove('9S'));
        expect(state).to.eql({});
    });


});
