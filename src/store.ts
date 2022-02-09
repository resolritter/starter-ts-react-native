import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

import { counterStore } from "./store/counter"

export const store = configureStore({
  reducer: combineReducers({ counter: counterStore.reducer }),
})

export type State = ReturnType<typeof store["getState"]>
