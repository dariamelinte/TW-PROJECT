const cleanInput = (input) => {
  for (const key in input) {
    if (input.hasOwnProperty(key) && input[key] === "") {
      input[key] = null;
    }
  }

  return input;
}

export default cleanInput;
