function suma(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError('Ambos argumentos deben ser números');
  }

  return a + b;
}

module.exports = { suma };
