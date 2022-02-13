import {
  Draft,
  enablePatches,
  original,
  Patch,
  produceWithPatches,
} from "immer"
import { Dimensions, PixelRatio } from "react-native"

enablePatches()

const { width: screenWidth } = Dimensions.get("window")

// based on iPhone 8's scale
const widthScale = screenWidth / 375

export const px = function (size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(widthScale * size))
}

export const produceWithPatch = function <T extends { patches: Patch[] }>(
  state: Draft<T>,
  mutate: (state: Draft<T>) => void,
) {
  const originalState = original(state) as T
  const [nextState, patches] = produceWithPatches(
    originalState,
    function (draft) {
      mutate(draft ?? state)
    },
  )
  for (const patch of patches) {
    nextState.patches.push(patch)
  }
  return nextState
}
