import { createSlice } from "@reduxjs/toolkit"
import { Patch } from "immer"

import { produceWithPatch } from "src/utils"

export type State = {
  count: number
  patches: Patch[]
}

const initialState: State = { count: 1, patches: [] }

export const counterStore = createSlice({
  name: "counter",
  initialState,
  reducers: {
    change: function (state, { payload }: { payload: State["count"] }) {
      return produceWithPatch(state, function (draft) {
        draft.count += payload
      })
    },
  },
})
