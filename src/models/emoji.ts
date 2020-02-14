type PureObject<T> = {
  [key: string]: T
}

export type EmojiModel = {
  name: string
  url: string
  aliases?: string[]
}

const getEmojiValueType = (value: string) =>
  value.match(/^alias:/) ? 'alias' : 'original'

export const createEmojis = (json: PureObject<string>): EmojiModel[] => {
  const emojiListObject: {
    [key: string]: EmojiModel
  } = {}

  const emojiAliasListObject: {
    [key: string]: string[]
  } = {}

  for (const [key, value] of Object.entries(json)) {
    if (getEmojiValueType(value) === 'original') {
      emojiListObject[key] = {
        name: key,
        url: value
      }
    } else {
      const originalName = value.split(':')[1]
      if (!emojiAliasListObject[originalName]) {
        emojiAliasListObject[originalName] = [key]
      } else {
        emojiAliasListObject[originalName].push(key)
      }
    }
  }

  for (const [key, values] of Object.entries(emojiAliasListObject)) {
    if (emojiListObject[key]) {
      emojiListObject[key].aliases = values
    }
  }

  return Object.values(emojiListObject)
}
