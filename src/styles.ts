const flexCenter = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
} as const

export const flexCenterColumn = {
  ...flexCenter,
  flexDirection: "column",
} as const

export const flexCenterRow = { ...flexCenter, flexDirection: "row" } as const
