import {
  ActionCreatorWithPayload,
  applyMiddleware,
  configureStore,
  createStore,
  Middleware,
} from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import thunkMiddleware from "redux-thunk"
import { persistStore, persistReducer, Persistor } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { counterStore, State as CounterState } from "./store/counter"

const setupStore = function () {
  const persistorRef: { current: Persistor | undefined } = {
    current: undefined,
  }
  const middleware: Middleware[] = [thunkMiddleware]

  const reducer = persistReducer(
    { key: "store", version: 1, storage: AsyncStorage },
    combineReducers({ counter: counterStore.reducer }),
  )

  // Declare after which actions should the store automatically be flushed
  const persistAfter: ActionCreatorWithPayload<any, any>[] = []
  for (const action of Object.values(counterStore.actions)) {
    persistAfter.push(action)
  }
  const automaticPersistenceMiddleware: Middleware = function () {
    return function (next) {
      return function (action) {
        const result = next(action)
        if (
          persistorRef.current !== undefined &&
          persistAfter.some(function (actionCreator) {
            return actionCreator.match(action)
          })
        ) {
          persistorRef.current.flush()
        }
        return result
      }
    }
  }
  middleware.push(automaticPersistenceMiddleware)

  const store = configureStore({ reducer, middleware })

  persistorRef.current = persistStore(store)

  return { store, persistor: persistorRef.current }
}

export const { store, persistor } = setupStore()
export type State = ReturnType<typeof store["getState"]>
