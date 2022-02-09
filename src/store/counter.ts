import { createSlice } from "@reduxjs/toolkit"

export type State = {
  count: number
}

const initialState: State = { count: 1 }

export const counterStore = createSlice({
  name: "account",
  initialState,
  reducers: {
    change: function (state, { payload }: { payload: State["count"] }) {
      state.count += payload
    },
  },
})
