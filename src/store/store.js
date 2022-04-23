import { combineReducers, createStore } from 'redux'

import productReducer from './product/reducer'

const reducers = combineReducers({
    product: productReducer
})

const store = createStore(reducers)

export default store