const listPlayers = document.querySelector('.recent-score__players');

class Players {
  constructor(user, score) {
    this.user = user;
    this.score = score;
    this.players = [];
  }

  populateFields() {
    localStorage.setItem('savedPlayers', JSON.stringify(this.players));
  }

  removePlayer(player) {
    this.players = this.players.filter((item) => item !== player);
    this.populateFields();
  }

  addPlayer(newPlayer) {
    this.players.push(newPlayer);
    this.populateFields();
    this.displayPlayers();
  }

  displayPlayers() {
    listPlayers.innerHTML = '';
    if (this.players.length > 0) {
      this.players.map((player) => {
        const divPlayer = document.createElement('tr');
        const elementPlayer = document.createElement('td');
        elementPlayer.textContent = `${player.user}: ${player.score}`;
        divPlayer.classList.add('.recent-score__container');
        divPlayer.appendChild(elementPlayer);
        listPlayers.appendChild(divPlayer);
        return listPlayers;
      });
    } else {
      const divPlayer = document.createElement('tr');
      const elementPlayer = document.createElement('td');
      elementPlayer.textContent = 'Add new player';
      divPlayer.classList.add('.recent-score__container');
      divPlayer.appendChild(elementPlayer);
      listPlayers.appendChild(divPlayer);
    }
  }
}

export default Players;
