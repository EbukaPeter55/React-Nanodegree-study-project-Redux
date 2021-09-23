// library
function createStore (reducer) {

    let state;
    let listeners = []

    // Get state
    const getState = () => state

    // Listen to changes
    const subscribe = (listener) => {
        listeners.push(listener)
        return () =>{
            listeners = listeners.filter(l => l !== listener)
        }
    }

    const dispatch = (action) =>{
    state = reducer(state, action)
    listeners.forEach((listener)=> listener())
    }
    
    return {
        getState,
        subscribe,
        dispatch
}
}

// app code
function todos (state = [], action) {
    switch(action.type){
        case 'ADD_TODO':
    return state.concat([action.todo]);
    // break;
        case 'REMOVE_TODO':
    return state.filter((todo) => todo.id !== action.id);
        case 'TOGGLE_TODO':
    return state.map((todo)=> todo.id !== action.id ? todo :
    Object.assign({}, todo, {complete: !todo.complete}))
        default:
    return state;        

    }
}

const store = createStore(todos)
store.subscribe(()=> {
    console.log("The new state is: ", store.getState());
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})