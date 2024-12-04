// scripts.js
document.getElementById('fuelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const distance = parseFloat(document.getElementById('distance').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);

    if (isNaN(distance) || isNaN(fuelConsumption) || isNaN(fuelPrice)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const fuelNeeded = distance / fuelConsumption;
    const totalCost = fuelNeeded * fuelPrice;

    const resultElement = document.getElementById('result');
    resultElement.innerText = `Custo total: R$ ${totalCost.toFixed(2)}`;
    resultElement.classList.add('show');
});
