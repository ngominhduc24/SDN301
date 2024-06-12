export const formatInputValue = (input) => {
  if (/^\d{10}$/.test(input)) {
    const type = input[0];
    const year = input.slice(1, 5);
    const id = input.slice(5);
    return `${type}-${year}-${id}`;
  }
  return input;
};