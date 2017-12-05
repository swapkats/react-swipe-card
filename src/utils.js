const calculateAngle = (distance, boundary = 200) => {
  let radians;
  radians = distance/boundary;
  if (radians < 0) {
    radians = Math.max(radians, -1)
  } else {
    radians = Math.min(radians, 1)
  }
  const degrees = radians * (180 / Math.PI);
  // console.log(degrees);
  return degrees;
}

export const translate3d = (x, y, beingSwiped = false) => {
  let translate;
  console.log(beingSwiped);
  if (!beingSwiped) {
    translate = `translate3d(${x}px, ${y}px, 0px)`
  } else {
    translate = `translate3d(${x}px, ${Math.abs(x)}px, 0) rotate(${calculateAngle(x)}deg)`
  }
  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate
  }
}

export const DIRECTIONS = [ 'Right', 'Left', 'Top', 'Bottom' ]
