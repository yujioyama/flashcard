// Word[]以外の配列もシャッフルできるよう、型はジェネリクスを使用
export const shuffleArray = <T>(array: T[]) => {
  const initialValue: T[] = []
  const cloneArray = [...array]

  const result = cloneArray.reduce((_, currentValue, index) => {
    const rand = Math.floor(Math.random() * (index + 1))
    cloneArray[index] = cloneArray[rand]
    cloneArray[rand] = currentValue
    return cloneArray
  }, initialValue)

  return result
}
