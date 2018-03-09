import * as R from 'ramda'
import ActionTypes from './action-types'
import { bindToDispatch } from 'bdux'

const OPERATORS = ['+', '-', '*']

const createOperand = () => (
  Math.floor(Math.random() * 10)
)

const createOperator = () => (
  OPERATORS[Math.floor(
    Math.random() * OPERATORS.length)]
)

const joinArgs = (...args) => (
  R.join('', args)
)

const createOperation = R.converge(
  joinArgs, [
    createOperand,
    createOperator,
    createOperand
  ]
)

export const challenge = () => ({
  type: ActionTypes.MATH_CHALLENGE,
  operation: createOperation()
})

export const answer = (number) => ({
  type: ActionTypes.MATH_ANSWER,
  answer: number
})

export const confirm = () => ({
  type: ActionTypes.MATH_CONFIRM
})

export default bindToDispatch({
  challenge,
  answer,
  confirm
})
