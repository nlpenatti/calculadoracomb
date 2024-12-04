particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#00E5FF"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.3,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00E5FF",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.3
          }
        }
      }
    },
    "retina_detect": true
  }
);

document.addEventListener('DOMContentLoaded', function() {
    const btnCalculadora = document.querySelector('.btn-gradient');
    if (btnCalculadora) {
        btnCalculadora.addEventListener('click', function(e) {
            e.preventDefault();
            
            const calculadoraSection = document.getElementById('calculadora');
            if (!calculadoraSection) return;

            // Limpa o conteúdo anterior
            calculadoraSection.innerHTML = `
                <div class="container">
                    <div class="row g-4">
                        <!-- Calculadora Álcool/Gasolina -->
                        <div class="col-md-6">
                            <div class="calculator-card">
                                <h2 class="text-white mb-4 text-center">Álcool ou Gasolina?</h2>
                                <p class="text-white-80 mb-4">
                                    Para saber qual combustível é mais vantajoso, utilizamos a relação de 70% entre os preços.
                                </p>
                                <div class="form-group mb-3">
                                    <label class="text-white-80 mb-2">Preço da Gasolina (R$)</label>
                                    <input type="number" id="gasolina" class="form-control" step="0.01" min="0">
                                </div>
                                <div class="form-group mb-4">
                                    <label class="text-white-80 mb-2">Preço do Álcool (R$)</label>
                                    <input type="number" id="alcool" class="form-control" step="0.01" min="0">
                                </div>
                                <button onclick="calcularCombustivel()" class="btn btn-gradient w-100">
                                    Calcular
                                </button>
                            </div>
                        </div>

                        <!-- Calculadora Custo Viagem -->
                        <div class="col-md-6">
                            <div class="calculator-card">
                                <h2 class="text-white mb-4 text-center">Custo da Viagem</h2>
                                <p class="text-white-80 mb-4">
                                    Calcule o custo total do combustível para sua viagem.
                                </p>
                                <div class="form-group mb-3">
                                    <label class="text-white-80 mb-2">Distância (km)</label>
                                    <input type="number" id="distancia" class="form-control" min="0">
                                </div>
                                
                                <!-- Inputs lado a lado -->
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="text-white-80 mb-2">Consumo (km/l)</label>
                                            <input type="number" id="consumo" class="form-control" step="0.1" min="0">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="text-white-80 mb-2">Preço (R$)</label>
                                            <input type="number" id="preco" class="form-control" step="0.01" min="0">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="checkbox" id="idaVolta">
                                    <label class="form-check-label text-white-80">
                                        Ida e Volta
                                    </label>
                                </div>
                                <button onclick="calcularViagem()" class="btn btn-gradient w-100">
                                    Calcular
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Scroll suave até a seção
            calculadoraSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Função para mostrar o modal com o resultado
function showResult(resultado) {
    // Remove qualquer modal existente antes de criar um novo
    const existingModals = document.querySelectorAll('.modal-custom');
    existingModals.forEach(modal => modal.remove());

    const modal = document.createElement('div');
    modal.className = 'modal-custom';
    modal.innerHTML = `
        <div class="modal-content-custom">
            <div class="modal-header-custom">
                <h3 class="text-white text-center mb-0">Resultado</h3>
                <button class="btn-close-modal" onclick="closeModal(this)" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-result">
                ${resultado}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Função para fechar o modal
function closeModal(button) {
    // Encontra o modal mais próximo
    const modal = button.closest('.modal-custom');
    if (!modal) return;

    // Remove a classe active para iniciar a animação de saída
    modal.classList.remove('active');

    // Remove o modal após a animação terminar
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = 'auto'; // Restaura o scroll da página
    }, 300);

    // Previne que outros modais sejam abertos
    if (document.querySelector('.modal-custom')) {
        document.querySelectorAll('.modal-custom').forEach(m => {
            if (m !== modal) m.remove();
        });
    }
}

// Adicione no início do arquivo
function showLoading() {
    showResult(`
        <div class="text-center">
            <div class="loading-spinner"></div>
            <p class="text-white">Calculando...</p>
        </div>
    `);
}

// Atualizar a função calcularCombustivel
function calcularCombustivel() {
    const gasolina = parseFloat(document.getElementById('gasolina').value);
    const alcool = parseFloat(document.getElementById('alcool').value);
    
    if (isNaN(gasolina) || isNaN(alcool)) {
        showResult(`
            <div class="alert alert-danger">
                Por favor, preencha todos os campos corretamente!
            </div>
        `);
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    // Simular processamento
    setTimeout(() => {
        const relacao = alcool / gasolina;
        
        let mensagem = `
            <div class="result-details">
                <h4 class="text-white mb-4 typing">
                    <i class="fas fa-${relacao <= 0.7 ? 'check-circle' : 'gas-pump'} result-icon"></i>
                    ${relacao <= 0.7 ? 'Álcool é mais vantajoso! 🎉' : 'Gasolina é mais vantajosa! 🚗'}
                </h4>
                <div class="result-content">
                    <p class="typing" style="animation-delay: 0.5s">
                        <i class="fas fa-calculator result-icon"></i>
                        <span class="result-value">Relação: ${(relacao * 100).toFixed(1)}%</span>
                    </p>
                    <div class="mt-4 typing" style="animation-delay: 1s">
                        <p class="text-white">
                            <i class="fas fa-info-circle result-icon"></i>
                            <strong>Como chegamos neste resultado:</strong>
                        </p>
                        <p class="text-white">
                            Preço do Álcool (R$ ${alcool.toFixed(2)}) ÷ Preço da Gasolina (R$ ${gasolina.toFixed(2)}) = ${relacao.toFixed(2)}
                        </p>
                        <p class="text-white">
                            O resultado ${relacao.toFixed(2)} é ${relacao <= 0.7 ? 'menor' : 'maior'} que 0,7, por isso 
                            ${relacao <= 0.7 ? 'o álcool' : 'a gasolina'} é mais vantajoso(a).
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        showResult(mensagem);
    }, 1500); // 1.5 segundos de loading
}

// Atualizar a função calcularViagem de forma similar
function calcularViagem() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const preco = parseFloat(document.getElementById('preco').value);
    const idaVolta = document.getElementById('idaVolta').checked;
    const resultado = document.getElementById('resultado-viagem');
    
    if (isNaN(distancia) || isNaN(consumo) || isNaN(preco)) {
        resultado.innerHTML = `
            <div class="alert alert-danger">
                Por favor, preencha todos os campos corretamente!
            </div>
        `;
        return;
    }
    
    const distanciaTotal = idaVolta ? distancia * 2 : distancia;
    const litrosNecessarios = distanciaTotal / consumo;
    const custoTotal = litrosNecessarios * preco;
    
    showLoading();
    
    setTimeout(() => {
        showResult(`
            <div class="result-details">
                <h4 class="text-white mb-4 typing">
                    <i class="fas fa-route result-icon"></i>
                    Resumo da viagem
                </h4>
                <div class="result-content">
                    <p class="typing" style="animation-delay: 0.5s">
                        <i class="fas fa-road result-icon"></i>
                        <span class="result-value">Distância total: ${distanciaTotal} km</span>
                    </p>
                    <p class="typing" style="animation-delay: 0.8s">
                        <i class="fas fa-gas-pump result-icon"></i>
                        <span class="result-value">Combustível necessário: ${litrosNecessarios.toFixed(1)} litros</span>
                    </p>
                    <p class="typing" style="animation-delay: 1.1s">
                        <i class="fas fa-dollar-sign result-icon"></i>
                        <span class="result-value">Custo total: R$ ${custoTotal.toFixed(2)}</span>
                    </p>
                    <div class="mt-4 typing" style="animation-delay: 1.4s">
                        <p class="text-white">
                            <i class="fas fa-info-circle result-icon"></i>
                            <strong>Como chegamos neste resultado:</strong>
                        </p>
                        <p class="text-white">
                            1. Distância total: ${distancia}km ${idaVolta ? 'x 2 (ida e volta) = ' + distanciaTotal + 'km' : ''}<br>
                            2. Litros necessários: ${distanciaTotal}km ÷ ${consumo}km/l = ${litrosNecessarios.toFixed(1)}L<br>
                            3. Custo total: ${litrosNecessarios.toFixed(1)}L x R$ ${preco.toFixed(2)} = R$ ${custoTotal.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        `);
    }, 1500);
}

// Adicione a biblioteca ScrollReveal no HTML
// <script src="https://unpkg.com/scrollreveal"></script>

ScrollReveal().reveal('.calculator-card', {
    delay: 200,
    distance: '20px',
    origin: 'bottom',
    opacity: 0,
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Adicione ao final do seu arquivo script.js
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

function showPrivacyModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-custom';
    modal.innerHTML = `
        <div class="modal-content-custom modal-lg">
            <div class="modal-header-custom">
                <h3 class="text-white text-center mb-0">Política de Privacidade</h3>
                <button class="btn-close-modal" onclick="closeModal(this)" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body-custom">
                <p class="text-white-80 mb-4">Última atualização: ${new Date().toLocaleDateString()}</p>

                <section class="mb-4">
                    <h4 class="text-white mb-3">1. Informações que Coletamos</h4>
                    <p class="text-white-80">Nossa calculadora de combustível não coleta nem armazena dados pessoais dos usuários. Todos os cálculos são realizados localmente no seu navegador.</p>
                </section>

                <section class="mb-4">
                    <h4 class="text-white mb-3">2. Cookies e Tecnologias Similares</h4>
                    <p class="text-white-80">Utilizamos apenas cookies essenciais para o funcionamento do site. Estes podem incluir:</p>
                    <ul class="text-white-80">
                        <li>Cookies de sessão para manter a funcionalidade básica do site</li>
                        <li>Cookies de análise anônima para entender como o site é utilizado</li>
                    </ul>
                </section>

                <section class="mb-4">
                    <h4 class="text-white mb-3">3. Seus Direitos (LGPD)</h4>
                    <p class="text-white-80">De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
                    <ul class="text-white-80">
                        <li>Confirmação da existência de tratamento de dados</li>
                        <li>Acesso aos dados</li>
                        <li>Correção de dados incompletos ou desatualizados</li>
                        <li>Eliminação dos dados</li>
                    </ul>
                </section>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function showTermsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-custom';
    modal.innerHTML = `
        <div class="modal-content-custom modal-lg">
            <div class="modal-header-custom">
                <h3 class="text-white text-center mb-0">Termos de Uso</h3>
                <button class="btn-close-modal" onclick="closeModal(this)" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body-custom">
                <p class="text-white-80 mb-4">Última atualização: ${new Date().toLocaleDateString()}</p>

                <section class="mb-4">
                    <h4 class="text-white mb-3">1. Aceitação dos Termos</h4>
                    <p class="text-white-80">Ao acessar e usar a Calculadora de Combustível, você aceita e concorda em cumprir estes Termos de Uso.</p>
                </section>

                <section class="mb-4">
                    <h4 class="text-white mb-3">2. Uso do Serviço</h4>
                    <p class="text-white-80">Nossa calculadora oferece estimativas baseadas nos dados fornecidos. Os resultados são aproximados e não devem ser considerados como valores definitivos.</p>
                </section>

                <section class="mb-4">
                    <h4 class="text-white mb-3">3. Limitação de Responsabilidade</h4>
                    <p class="text-white-80">Não nos responsabilizamos por:</p>
                    <ul class="text-white-80">
                        <li>Decisões tomadas com base nos cálculos fornecidos</li>
                        <li>Precisão dos dados inseridos pelos usuários</li>
                        <li>Variações de preços e consumo não previstas</li>
                    </ul>
                </section>

                <section class="mb-4">
                    <h4 class="text-white mb-3">4. Lei Aplicável</h4>
                    <p class="text-white-80">Estes termos são regidos pelas leis da República Federativa do Brasil.</p>
                </section>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Adicione estas funções para melhor experiência mobile
document.addEventListener('DOMContentLoaded', function() {
    // Previne zoom em inputs no iOS
    const metas = document.getElementsByTagName('meta');
    let metaViewport = [...metas].find(meta => meta.name === "viewport");
    if (!metaViewport) {
        metaViewport = document.createElement('meta');
        metaViewport.name = "viewport";
        document.head.appendChild(metaViewport);
    }
    metaViewport.content = "width=device-width, initial-scale=1, maximum-scale=1";

    // Ajusta altura do vh para mobile
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);
});
