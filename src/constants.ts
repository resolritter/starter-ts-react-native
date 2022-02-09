export const labels = {
  Root: "Root",
  HomePage: { PresentationText: "HomePage__PresentationText" },
}

export const routes = { home: "home", example: "example" } as const

export const baseStyles = {
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
} as const

export const styles = {
  ...baseStyles,
  flexCenterColumn: { ...baseStyles.flexCenter, flexDirection: "column" },
  flexCenterRow: { ...baseStyles.flexCenter, flexDirection: "row" },
} as const
