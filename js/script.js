function cicloGeneralAprobado() {
  const ids = ['241', '242', '245', '246', '255', '256'];
  return ids.every(id => document.getElementById(id).classList.contains('aprobado'));
}

function actualizarEstado() {
  const aprobados = new Set(
    [...document.querySelectorAll('.ramo.aprobado')].map(r => r.id)
  );

  document.querySelectorAll('.ramo').forEach(ramo => {
    if (ramo.classList.contains('aprobado')) return;

    const requisitos = ramo.dataset.requiere.split(',').filter(Boolean);
    const desbloqueado = requisitos.every(req =>
      req === "general" ? cicloGeneralAprobado() : aprobados.has(req)
    );

    if (desbloqueado) ramo.disabled = false;
  });
}

document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.disabled = ramo.dataset.requiere !== "";

  ramo.addEventListener('click', () => {
    if (ramo.disabled) return;
    ramo.classList.add('aprobado');
    ramo.disabled = true;
    actualizarEstado();
  });
});
