const inputs = document.querySelectorAll('form input');
const resultCard = document.querySelector('.result-card');
const card = document.querySelector('.card');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-button');
const infoText = document.querySelector('.info-text');

console.log(infoText);

submitBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevenir comportamento padrão do formulário

  const weight = inputs[3].value;
  const height = inputs[4].value;
  const resultText = document.querySelector('#imc-value');
  const healthTipsLink = document.getElementById('health-tips-link'); // Div que contém o link
  const tipsLink = document.getElementById('tips-link'); // Elemento <a> do link
  const imc = weight / (height * height);

  if (weight == 0 || height == 0) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  form.classList.remove('show');
  form.classList.add('hidden');
  resultCard.classList.remove('hidden');
  resultCard.classList.add('show');

  const imcRanges = [
    { max: 17, message: 'Você está muito abaixo do peso.', query: 'dicas para ganho de peso saudável' },
    { max: 18.5, message: 'Você está abaixo do peso.', query: 'dicas para ganho de peso saudável' },
    { max: 25, message: 'Você está no peso ideal.', query: 'dicas para manter um peso saudável' },
    { max: 30, message: 'Você está em sobrepeso.', query: 'dicas para perder peso de forma saudável' },
    { max: 35, message: 'Você está em obesidade.', query: 'dicas para obesidade e saúde' },
    { max: 40, message: 'Você está em obesidade severa.', query: 'dicas para obesidade severa' },
    { max: Infinity, message: 'Você está em obesidade mórbida.', query: 'dicas para obesidade mórbida' },
  ];

  let message = '';
  let query = '';

  for (const range of imcRanges) {
    if (imc <= range.max) {
      message = `${imc.toFixed(1)} ${range.message}`;
      query = range.query;
      break;
    }
  }

  resultText.innerHTML = message;

  // Gerar link dinâmico com base no IMC
  const encodedQuery = encodeURIComponent(query);
  tipsLink.href = `https://chat.openai.com/?q=${encodedQuery}`;
  healthTipsLink.classList.remove('hidden'); // Exibir o link
});

const changeThemeBtn = document.querySelector('#switch');

changeThemeBtn.addEventListener('click', () => {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const body = document.querySelector('body');

  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    footer.classList.remove('dark-section');
    card.classList.remove('dark-section');
  } else {
    body.classList.add('dark-mode');
    header.classList.add('dark-mode');
    footer.classList.add('dark-section');
    card.classList.add('dark-section');
  }
});

const returnBtn = document.querySelector('.return-btn');

returnBtn.addEventListener('click', () => {
  form.classList.add('show');
  form.classList.remove('hidden');
  resultCard.classList.add('hidden');
  resultCard.classList.remove('show');
});

const modal = document.getElementById('modal');

function showModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function showWelcomeModal() {
  const modalShown = sessionStorage.getItem('modalShown');

  if (!modalShown) {
    showModal();
    sessionStorage.setItem('modalShown', 'true');
  }
}

window.onload = function () {
  showWelcomeModal();
};