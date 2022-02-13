import { Dimensions, PixelRatio } from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const scale = screenWidth / screenHeight
export const normalize = function (size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(scale * size))
}
