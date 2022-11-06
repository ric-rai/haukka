export const snakeToKebab = (str: string): string => str.replaceAll('_', '-')

export const kebabToSnake = (str: string): string => str.replaceAll('-', '_')

export const capitalize = (str: string): string =>
  str.replace(/^./, (m) => m.toUpperCase())

export const snakeToSentence = (str: string): string =>
  capitalize(str.replaceAll('_', ' '))

export const snakeToPascal = (str: string): string => {
  return str
    .split('_')
    .map((word) => capitalize(word))
    .join('')
}
