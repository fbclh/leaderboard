import Players from './components/players.js';
import './style.css';

let keyGame;
const form = document.querySelector('.add-score__form');
const refreshBtn = document.querySelector('.recent-score__btn');
const responsePost = document.querySelector('.add-score__response-post');
const listPlayers = document.querySelector('.recent-score__players');
const [name, score] = form.elements;
const objPlayers = new Players();
const urlNewGame = `
  https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/`;
const nameGame = { name: 'Cool name' };

if (localStorage.savedPlayers) {
  objPlayers.players = JSON.parse(localStorage.getItem('savedPlayers'));
}

const keyNewGameAPIs = async () => {
  const response = await fetch(urlNewGame, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(nameGame),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.result; //.slice(14, 34);
};

if (localStorage.keyGame) {
  keyGame = localStorage.getItem('keyGame');
} else {
  const loadKey = async () => {
    keyGame = await keyNewGameAPIs();
    localStorage.setItem('keyGame', keyGame);
  };
  loadKey();
}

const getAPIs = async () => {
  listPlayers.classList.add('hidden');
  const response = await fetch(`
    https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keyGame}/scores`);
  const data = await response.json();
  objPlayers.players = data.result;
  listPlayers.classList.remove('hidden');
  objPlayers.displayPlayers();
  return data.result;
};

const postPlayer = async (newPlayer) => {
  const response = await fetch(
    `
  https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keyGame}/scores`,
    {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(newPlayer),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.result;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newPlayer = {
    user: name.value,
    score: score.value,
  };
  responsePost.textContent = await postPlayer(newPlayer);
  name.value = '';
  score.value = '';

  setTimeout(() => {
    responsePost.textContent = '';
  }, 3000);
});

refreshBtn.addEventListener('click', getAPIs);
objPlayers.displayPlayers();
objPlayers.populateFields();
