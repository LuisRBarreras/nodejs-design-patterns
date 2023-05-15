class StackCalculator {
  constructor () {
    this.stack = []
  }

  putValue (value) {
    this.stack.push(value)
  }

  getValue () {
    this.stack.pop()
  }

  peekValue () {
    return this.stack[this.stack.length - 1]
  }

  clear () {
    this.stack = []
  }

  divide () {
    const divisor = this.getValue()
    const dividend = this.getValue()
    const result = dividend / divisor

    this.putValue(result)
    return result
  }

  multiply () {
    const multiplicand = this.getValue()
    const multiplier = this.getValue()
    const result = multiplier * multiplicand
    this.putValue(result)
    return result
  }
}

const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      // proxie method
      return function () {
        // additional validation logic
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw Error('Vision by 0')
        }

        // if valid delegates to the subject
        return target.divide()
      }
    }

    // delegated method and properties
    return target[property]
  }
}

function main () {
  const calculator = new StackCalculator()

  const safeCalculator = new Proxy(calculator, safeCalculatorHandler)
  safeCalculator.putValue(5)
  safeCalculator.putValue(0)
  console.log(safeCalculator.divide())
}

main()
