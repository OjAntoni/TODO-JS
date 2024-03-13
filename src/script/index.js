window.onload = () => {
  const body = document.body;

  const form = body.querySelector(".form-add");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("The form has been summoned!");
  });
};
