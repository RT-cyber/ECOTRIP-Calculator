// ELEMENTOS
const distanceInput = document.getElementById("distance");
const distanceSlider = document.getElementById("distanceSlider");
const btnCalculate = document.getElementById("btnCalculate");

const impactValue = document.getElementById("impactValue");
const equivTrees = document.getElementById("equivTrees");
const equivCarKm = document.getElementById("equivCarKm");
const equivPhone = document.getElementById("equivPhone");
const suggestionText = document.getElementById("suggestionText");

const modalOverlay = document.getElementById("modalOverlay");
const btnHelp = document.getElementById("btnHelp");
const modalClose = document.getElementById("modalClose");

// FATORES (g CO2 por km)
const emissionFactors = {
  car_gas: 192,
  car_elec: 53,
  bus: 68,
  train: 41,
  plane: 255,
  bike: 0,
  walk: 0
};

// PERFIL (% extra)
const profileFactors = {
  urban: 1.1,
  highway: 1,
  mixed: 1.05
};

// SYNC INPUT + SLIDER
distanceSlider.addEventListener("input", () => {
  distanceInput.value = distanceSlider.value;
});

distanceInput.addEventListener("input", () => {
  distanceSlider.value = distanceInput.value;
});

// CALCULAR
btnCalculate.addEventListener("click", () => {
  const distance = parseFloat(distanceInput.value);

  if (!distance || distance <= 0) {
    alert("Digite uma distância válida");
    return;
  }

  const transport = document.querySelector("input[name='transport']:checked").value;
  const profile = document.querySelector("input[name='profile']:checked").value;

  const emissionPerKm = emissionFactors[transport];
  const profileMultiplier = profileFactors[profile];

  // cálculo (g → kg)
  const totalEmissionKg = (distance * emissionPerKm * profileMultiplier) / 1000;

  // atualizar UI
  impactValue.textContent = totalEmissionKg.toFixed(2) + " kg CO₂";

  // equivalentes
  equivTrees.textContent = Math.ceil(totalEmissionKg / 5);
  equivCarKm.textContent = Math.round(totalEmissionKg / 0.192);
  equivPhone.textContent = Math.round(totalEmissionKg * 122);

  // sugestão
  generateSuggestion(transport, totalEmissionKg);
});

// SUGESTÃO
function generateSuggestion(transport, emission) {
  if (transport === "plane") {
    suggestionText.textContent =
      "Voos geram alto impacto. Considere ônibus ou trem para reduzir drasticamente as emissões.";
  } else if (transport === "car_gas") {
    suggestionText.textContent =
      "Carros a gasolina poluem bastante. Que tal carona, ônibus ou carro elétrico?";
  } else if (transport === "car_elec") {
    suggestionText.textContent =
      "Boa escolha! Para impacto quase zero, considere bicicleta ou caminhada em distâncias curtas.";
  } else if (transport === "bike" || transport === "walk") {
    suggestionText.textContent =
      "Perfeito! Você escolheu a opção mais sustentável possível 🚀🌱";
  } else {
    suggestionText.textContent =
      "Você está em um nível moderado de emissão. Pequenas mudanças já fazem grande diferença!";
  }
}

// MODAL
btnHelp.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

modalClose.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});