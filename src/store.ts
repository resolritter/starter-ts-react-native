import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  Action,
  ActionCreatorWithPayload,
  configureStore,
  Middleware,
} from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { Persistor, persistReducer, persistStore } from "redux-persist"
import thunkMiddleware from "redux-thunk"

import { counterStore } from "./store/counter"

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
      return function (action: Action<unknown>) {
        const result: any = next(action)
        if (
          persistorRef.current !== undefined &&
          persistAfter.some(function (actionCreator) {
            return actionCreator.match(action)
          })
        ) {
          persistorRef.current.flush()
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
