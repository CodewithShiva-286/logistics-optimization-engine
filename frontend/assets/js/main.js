const roleSelect = document.getElementById("role");
const continueBtn = document.getElementById("continueBtn");

if (roleSelect && continueBtn) {
  continueBtn.addEventListener("click", () => {
    const role = roleSelect.value;

    if (role === "user") {
      window.location.href = "./user/dashboard.html";
      return;
    }

    if (role === "driver") {
      window.location.href = "./driver/dashboard.html";
      return;
    }

    alert("Please select a role first.");
  });
}
