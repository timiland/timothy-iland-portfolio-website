const parseStringToNumber = (string: string): number => {
  const extractedNumber: number = parseInt(string, 10);

  if (Number.isNaN(extractedNumber)) {
    return 0; // or any other value to indicate invalid input
  }

  return extractedNumber;
};

export default parseStringToNumber;
