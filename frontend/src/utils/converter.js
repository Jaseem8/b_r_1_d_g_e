// function convertAndScaleScientificNumber(scientificNumber, scaleFactor = 1) {
//   // Step 1: Scale the number appropriately (10^18 in this case)
//   let scaledNumber = scientificNumber * Math.pow(10, 18);

//   // Step 2: Format the number with commas and two decimal places
//   let formattedNumber = scaledNumber.toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   // Convert the formatted number string back to a number for multiplication
//   let numericValue = parseFloat(formattedNumber.replace(/,/g, ""));

//   // Step 3: Apply the scale factor
//   let finalValue = numericValue * scaleFactor;

//   // Step 4: Format the final value with commas and two decimal places
//   let finalFormattedValue = finalValue.toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return finalFormattedValue;
// }

function sumOfExponents(num1, num2) {
  // Function to convert a number to scientific notation and return the exponent
  function getExponent(numStr) {
    // If the number string contains 'e', it means it's already in scientific notation
    if (numStr.includes("e")) {
      return 1;
    }
    if (numStr.includes("E")) {
      return 1;
    }

    // Convert the string to a number and then to scientific notation
    const num = parseFloat(numStr);
    const scientificNotation = num.toExponential();

    // Extract the exponent part from the scientific notation
    const exponent = parseInt(scientificNotation.split("e")[1], 10);

    return exponent;
  }

  // Get exponents for both numbers
  const exponentNum1 = getExponent(num1);
  const exponentNum2 = getExponent(num2);
  if (exponentNum1 == 1 && exponentNum2 == 1) return 1;
  // Sum of the exponents
  const sumOfExponents = exponentNum1 + exponentNum2;

  // Return the result in the form of 10^sumOfExponents
  return Math.pow(10, sumOfExponents);
}

export default sumOfExponents;
