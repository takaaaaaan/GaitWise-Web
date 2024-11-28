type InputData = {
  id: number
  type: string
  question: string
  options: string[]
  max?: number
  min?: number
}

type OutputData = {
  selection: {
    content: string
    options: string[]
    type: string
    min: number | null
    max: number | null
  }[]
  text_response: {
    content: string
  }[]
}

export const transformSurveyData = (inputData: InputData[]): OutputData => {
  const output: OutputData = {
    selection: [],
    text_response: [],
  }

  inputData.forEach((item) => {
    if (item.type === 'multiple') {
      output.selection.push({
        content: item.question,
        options: item.options,
        type: 'multi-choice',
        min: item.min || null,
        max: item.max || null,
      })
    } else if (item.type === 'text') {
      output.text_response.push({
        content: item.question,
      })
    }
  })

  return output
}
