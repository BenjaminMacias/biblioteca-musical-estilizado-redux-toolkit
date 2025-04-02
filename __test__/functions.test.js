// __tests__/functions.test.js

const {
    sumArray,
    countWords,
    findMax,
    isDivisible
  } = require('../functions');
  
  describe('sumArray', () => {
    test('Suma números positivos', () => {
      expect(sumArray([1, 2, 3, 4])).toBe(10);
    });
  
    test('Suma números negativos', () => {
      expect(sumArray([-1, -2, -3])).toBe(-6);
    });
  
    test('Arreglo vacío retorna 0', () => {
      expect(sumArray([])).toBe(0);
    });
  
    test('Arreglo con ceros', () => {
      expect(sumArray([0, 0, 0])).toBe(0);
    });
  });
  
  describe('countWords', () => {
    test('Texto normal', () => {
      expect(countWords('Hola mundo esto es una prueba')).toBe(6);
    });
  
    test('Texto con espacios al inicio y final', () => {
      expect(countWords('  Hola mundo  ')).toBe(2);
    });
  
    test('Cadena vacía retorna 0', () => {
      expect(countWords('')).toBe(0);
    });
  
    test('Espacios consecutivos', () => {
      expect(countWords('Hola   mundo')).toBe(2);
    });
  });
  
  describe('findMax', () => {
    test('Números positivos', () => {
      expect(findMax([1, 5, 3])).toBe(5);
    });
  
    test('Números negativos', () => {
      expect(findMax([-10, -3, -7])).toBe(-3);
    });
  
    test('Arreglo vacío', () => {
      expect(findMax([])).toBeNull();
    });
  
    test('Todos los números iguales', () => {
      expect(findMax([4, 4, 4])).toBe(4);
    });
  });
  
  describe('isDivisible', () => {
    test('Divisible', () => {
      expect(isDivisible(10, 2)).toBe(true);
    });
  
    test('No divisible', () => {
      expect(isDivisible(10, 3)).toBe(false);
    });
  
    test('División entre 0', () => {
      expect(isDivisible(10, 0)).toBe('No se puede dividir entre cero');
    });
  
    test('Números negativos', () => {
      expect(isDivisible(-10, 2)).toBe(true);
    });
  });
  