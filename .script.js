document.getElementById("form-registro")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  localStorage.setItem("nombre", nombre);
  window.location.href = "perfil.html"; // redirige al perfil
});
