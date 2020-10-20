export type Command = {
  key: string
  label: string
  handler: () => unknown
  background?: boolean
  custom?: boolean
}
