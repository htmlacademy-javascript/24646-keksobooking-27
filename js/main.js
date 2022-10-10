function randomInteger(min, max) {
  if(min < max){
    if(min >= 0){
      // случайное число от min до (max+1)
      const rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    return NaN;
  }
  return NaN;
}

function random(min, max, fixed) {
  if(min < max){
    if(min >= 0){
      return (min + Math.random() * (max - min)).toFixed(fixed);
    }
    return NaN;
  }
  return NaN;
}
randomInteger(0, 25);
random(0.2, 0.3, 6);
