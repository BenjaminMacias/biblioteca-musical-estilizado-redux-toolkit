// functions.js

function sumArray(numbers) {
    let total = 0;
    for (let num of numbers) {
      total += num;
    }
    return total;
  }
  
  function countWords(text) {
    if (!text || text.trim() === '') return 0;
    const words = text.split(' ');
    return words.filter(word => word !== '').length;
  }
  
  function findMax(numbers) {
    if (numbers.length === 0) return null;
    let max = numbers[0];
    for (let num of numbers) {
      if (num > max) max = num;
    }
    return max;
  }
  
  function isDivisible(num, divisor) {
    if (divisor === 0) return 'No se puede dividir entre cero';
    return num % divisor === 0;
  }
  
  module.exports = {
    sumArray,
    countWords,
    findMax,
    isDivisible,
  };
  