export default function convertAndScaleScientificNumber(
  scientificNumber,
  scaleFactor = 1
) {
  // Step 1: Scale the number appropriately (10^18 in this case)
  let scaledNumber = scientificNumber * Math.pow(10, 18);

  // Step 2: Format the number with commas and two decimal places
  let formattedNumber = scaledNumber.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Convert the formatted number string back to a number for multiplication
  let numericValue = parseFloat(formattedNumber.replace(/,/g, ""));

  // Step 3: Apply the scale factor
  let finalValue = numericValue * scaleFactor;

  // Step 4: Format the final value with commas and two decimal places
  let finalFormattedValue = finalValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return finalFormattedValue;
}
