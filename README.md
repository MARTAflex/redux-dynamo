redux-dynamo

This reducer allows you to add and remove other reducers dynamically via actions.
Works probably best in conjunction with libraries that lets you encapsulate the state like
- https://github.com/DataDog/redux-doghouse
- https://github.com/salsita/prism
- https://github.com/HansDP/local-react-redux
- https://github.com/MARTAflex/redux-capsule

The intention behind it is to bundle react components with their own reducers fpr better reusability and easy dynamic mounting.

Basic Usage:
    var Redux = require('redux'),
        dynamo = require('redux-dynamo');

    var store = Redux.createStore(
        dynamo.reducer,
        undefined,
    );
    
    var FooReducer = (state, action) => (
        action.type === 'foo/add-to-baz'
        ? { ...state, baz: state.baz + 1 }
        : state
    );

    store.dispatch(dynamo.actions.set('foo', FooReducer));
    // { 'dynamo-reducer-registry': { demo: [Function: FooReducer] },
    //    demo: { baz: 0 } }

    store.dispatch({ type: 'foo/add-to-baz' });
    // { 'dynamo-reducer-registry': { demo: [Function: FooReducer] },
    //    demo: { baz: 1 } }

    store.dispatch(dynamo.actions.remove('foo'));
    // { 'dynamo-reducer-registry': {} }

The Example above however doesnt't make it very clear in what way this could benefit your application, so let me add a more complex example that includes react and redux-capsule.
    var React = require('react'),
        Redux = require('redux');

    var store = Redux.createStore(
        dynamo.reducer,
        undefined,
    );
    
    var FooReducer = (state, action) => (
        action.type === 'foo/add-to-baz'
        ? { ...state, baz: state.baz + 1 }
        : state
    );

    // a simple component
    
