import { Dimensions, PixelRatio } from "react-native"

const { width: screenWidth } = Dimensions.get("window")

// based on iPhone 8's scale
const widthScale = screenWidth / 375

export const normalize = function (size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(widthScale * size))
}
