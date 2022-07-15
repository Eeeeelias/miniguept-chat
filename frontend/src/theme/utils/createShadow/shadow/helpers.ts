export const range = (start: number, end?: number, step = 1) => {
  const output = []
  if (end === undefined) {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}

export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin)
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
}

export const roundTo = (number: number, places = 0) =>
  Math.round(number * 10 ** places) / 10 ** places

type Point = [number, number]
interface GetValuesForBezierCurveArgs {
  startPoint: Point
  endPoint: Point
  controlPoint1: Point
  controlPoint2: Point
}

/**
 * Given 3-4 points for a cubic bezier curve, figure out the X/Y values for
 * `t`, a number from 0-1 representing progress.
 */
export const getValuesForBezierCurve = (
  {
    startPoint,
    endPoint,
    controlPoint1,
    controlPoint2,
  }: GetValuesForBezierCurveArgs,
  t: number
) => {
  let x, y
  if (controlPoint2) {
    // Cubic Bezier curve
    x =
      (1 - t) ** 3 * startPoint[0] +
      3 * (1 - t) ** 2 * t * controlPoint1[0] +
      3 * (1 - t) * t ** 2 * controlPoint2[0] +
      t ** 3 * endPoint[0]

    y =
      (1 - t) ** 3 * startPoint[1] +
      3 * (1 - t) ** 2 * t * controlPoint1[1] +
      3 * (1 - t) * t ** 2 * controlPoint2[1] +
      t ** 3 * endPoint[1]
  } else {
    // Quadratic Bezier curve
    x =
      (1 - t) * (1 - t) * startPoint[0] +
      2 * (1 - t) * t * controlPoint1[0] +
      t * t * endPoint[0]
    y =
      (1 - t) * (1 - t) * startPoint[1] +
      2 * (1 - t) * t * controlPoint1[1] +
      t * t * endPoint[1]
  }

  return [x, y]
}
