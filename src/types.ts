type Group = {
  icon: string
  label: string
  char: string
}

export type Command = {
  key: string
  label: string
  handler: () => unknown
  background?: boolean
  custom?: boolean
  group: Group
}
