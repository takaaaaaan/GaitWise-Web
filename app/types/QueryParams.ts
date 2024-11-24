export type UrlQueryParams = {
  params: string
  key: string
  value: string | number | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}
