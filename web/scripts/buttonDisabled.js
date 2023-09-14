const buttonDisabled = (input, button) => {
  input.addEventListener("input", (e) => {
    if (e.target.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
};
export default buttonDisabled;
