const initialState={
    username: '',
    password: ''
}

// ACTION TYPES

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

function reducer(state=initialState, action){
    switch(action.type){
        case UPDATE_USERNAME:
            return Object.assign({}, state, {username: action.payload});
        case UPDATE_PASSWORD:
            return Object.assign({}, state, {password: action.payload});
        default:
            return state
    }
}

// UPDATE STATE METHODS

export function updateUsername(username){
    return{
        type: UPDATE_USERNAME,
        payload: username
    }
}

export function updatePassword(password){
    return{
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export default reducer