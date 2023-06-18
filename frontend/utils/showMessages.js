export const showError = (message) => {
  const error = document.getElementById("error");
  error.innerHTML = message;
  error.className = "bg-red-500 text-white centered-text rounded shadow-small p-2 mt-3";
};

export const showMessage = (message) => {
  const error = document.getElementById("message");
  error.innerHTML = message;
  error.className = "bg-green-500 text-white centered-text rounded shadow-small p-2 mt-3";
};

