type PureObject = {
  [key: string]: string
}

type KeyValueObject<T> = {
  key: string
  value: T
}

const ToKeyValueObject = <ValueType>(
  key: string,
  value: ValueType
): KeyValueObject<ValueType> => {
  return { key: key, value: value }
}

export type EmojiModel = {
  type: 'original' | 'alias'
  name: string
  url?: string
  originalName?: string
}

export type IntegratedEmojiModel = {
  name: string
  url: string
  aliases: string[]
}

export const createEmoji = (json: KeyValueObject<string>): EmojiModel => {
  return json.value.match(/^alias:/)
    ? { type: 'alias', name: json.key, originalName: json.value.split(':')[1] }
    : { type: 'original', name: json.key, url: json.value }
}

export const createEmojis = (json: PureObject): EmojiModel[] => {
  return Object.entries(json).map(([key, value]) => {
    return createEmoji(ToKeyValueObject<string>(key, value))
  })
}
