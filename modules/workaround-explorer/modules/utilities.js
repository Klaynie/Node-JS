const formatNumber = number => {
  let num = number;
  if (typeof(num) === 'string') {
    num = parseFloat(num);
  }
  num = Math.floor(num);
  const numStr = num.toLocaleString('en-US');
  return numStr;
}

export { formatNumber };