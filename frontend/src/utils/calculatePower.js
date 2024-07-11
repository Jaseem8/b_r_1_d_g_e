function calculatePower(numStr) {
  // Convert number to string

  // Check if the number is in scientific notation
  let isInScientificNotation = numStr.toLowerCase().includes("e");

  // Extract the exponent part from the scientific notation if applicable
  let exponent = 0;
  if (isInScientificNotation) {
    exponent = parseInt(numStr.split(/[eE]/)[1]);
    // Compute the modulus of the exponent
    exponent = Math.abs(exponent);
    let result = Math.pow(10, exponent + 3);
    return result;
  } else {
    let number = +numStr;

    let scientificNotation = number.toExponential();
    let exponent = parseInt(scientificNotation.split("e")[1]);
    exponent = Math.abs(exponent);
    let result = Math.pow(10, exponent);
    return result;
  }
}

export default calculatePower;
