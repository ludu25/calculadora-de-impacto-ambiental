document.getElementById('impact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtendo os valores dos inputs
  const energia = parseFloat(document.getElementById('energia').value);
  const agua = parseFloat(document.getElementById('agua').value);
  const transporte = parseFloat(document.getElementById('transporte').value);

  // Verificando se os valores são válidos
  if (isNaN(energia) || isNaN(agua) || isNaN(transporte)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const litros = transporte / 10;

  const impactoEnergia = energia * 0.0817;
  const impactoAgua = energia * 0.01;
  const impactoTransporte = litros * 0.82 * 0.75 * 3.7;
  const total = (impactoEnergia + impactoTransporte);

  // Atualizando o resultado com explicações
  const result = `
  <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
    <h2 style="text-align: center; font-size: 2rem; color: #333;">Ao total você emitiu <span style="color: green;">${total.toFixed(2)} kg de CO2</span></h2>
    
    <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin-top: 20px;">
      <p style="font-size: 1.1rem; text-align: center;">
        O impacto ambiental total é um reflexo de <span class="underlined">três fatores principais</span>: o consumo de <b>energia elétrica</b>, o uso de <b>água</b> e as distâncias percorridas para <b>transporte</b>. 
      </p>
      
      <ul style="list-style: none; padding-left: 0; font-size: 1rem;text-align: justify;">
        <li style="margin-bottom: 10px;">
          <i class="fas fa-bolt" style="color: yellowgreen;"></i> 
          <strong> Energia:</strong> Você emitiu <span style="color: green;">${impactoEnergia.toFixed(2)} kg de CO2</span> por cada kWh de energia consumido. O gasto de <span style="color: green;">${energia} kWh</span> coloca você entre os <span style="color: green;">40%</span> mais consumidores de energia em sua região.
        </li>
        
        <li style="margin-bottom: 10px;">
          <i class="fas fa-tint" style="color: aquamarine;"></i> 
          <strong> Água:</strong> Você emitiu <span style="color: green;">${impactoAgua.toFixed(2)} kg de CO2</span>. O processo de captação, tratamento e distribuição de água requer grande consumo de energia, o que pode resultar em emissões indiretas de CO2. O gasto de <span style="color: green;">${agua} litros</span> coloca você no <span style="color: green;">top 30%</span> de usuários que consomem mais água.
        </li>
        
        <li style="margin-bottom: 20px;">
          <i class="fas fa-road" style="color: grey;"></i> 
          <strong> Transporte:</strong> Você emitiu <span style="color: green;">${impactoTransporte.toFixed(2)} kg de CO2</span> por km percorrido. Com <span style="color: green;">${transporte} km</span>, você está no grupo dos <span style="color: green;">50%</span> que têm uma pegada de transporte moderada.
        </li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <p style="font-size: 1.2rem; color: #333; font-weight: bold;">
        <i class="fas fa-exclamation-triangle" style="color: #ff5733;"></i> 
        Reduzir o impacto ambiental é fundamental para preservar o meio ambiente para as gerações futuras. Considere práticas sustentáveis em seu dia a dia!
      </p>

      <button onclick="mostrarDicas()" style="padding: 10px 20px; font-size: 1rem; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Veja como reduzir seu impacto!
      </button>

      <div id="dicas" style="display: none; margin-top: 20px; background-color: #eaf0e4; padding: 15px; border-radius: 5px;">
        <h3>Dicas para Reduzir o Impacto Ambiental</h3>
        <ul style="list-style: none; padding: 0 10px; text-align: justify">
          <li style="padding:10px;"><i class="fas fa-bolt" style="color: yellowgreen;"></i> <strong>Reduza o consumo de energia:</strong> Desligue aparelhos quando não estiverem em uso e invista em lâmpadas LED.</li>
          <li style="padding:10px;"><i class="fas fa-tint" style="color: aquamarine;"></i> <strong>Consuma menos água:</strong> Tome banhos mais curtos e conserte vazamentos.</li>
          <li style="padding:10px;"><i class="fas fa-road" style="color: grey;"></i> <strong>Use transporte sustentável:</strong> Sempre que possível, prefira transporte público, bicicleta ou caminhe.</li>
        </ul>
      </div>
    </div>
  </div>`;

  document.getElementById('resultado').innerHTML = result;

  const ctx = document.getElementById('impactChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Impacto Ambiental'],  // Um rótulo único para o eixo x
      datasets: [
        {
          label: 'Energia (kg CO2)',
          data: [impactoEnergia], // Dados específicos para Energia
          backgroundColor: '#4caf50',
          borderColor: '#388e3c',
          borderWidth: 1
        },
        {
          label: 'Água (kg CO2)',
          data: [impactoAgua],  // Dados específicos para Água
          backgroundColor: '#2196f3',
          borderColor: '#1976d2',
          borderWidth: 1
        },
        {
          label: 'Transporte (kg CO2)',
          data: [impactoTransporte],  // Dados específicos para Transporte
          backgroundColor: '#ff5722',
          borderColor: '#f44336',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

function mostrarDicas() {
  const dicas = document.getElementById('dicas');
  dicas.style.display = dicas.style.display === 'none' ? 'block' : 'none';
}