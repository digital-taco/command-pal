export type Command = {
  command: string
  label: string
  handler?: () => unknown
  message?: boolean
}
