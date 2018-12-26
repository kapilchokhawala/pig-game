/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, previousPlayer

var dice1Dom = document.getElementById('dice-1')
var dice2Dom = document.getElementById('dice-2')

init()

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1
    var dice2 = Math.floor(Math.random() * 6) + 1
    var dicesTotal = dice1 + dice2
    console.log(`${dice1} + ${dice2} = ${dicesTotal}`)

    // 2. Display the result
    
    dice1Dom.style.display = 'block'
    dice2Dom.style.display = 'block'

    dice1Dom.src = `dice-${dice1}.png`
    dice2Dom.src = `dice-${dice2}.png`

    // // 3. Update the round score, only If the round number is not 1
    // if(dice === 6 && previousDice === 6 && activePlayer === previousPlayer) {
    //   roundScore = 0
    //   scores[activePlayer] = roundScore
    //   document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
    //   nextPlayer()
    // } else if(dice !== 1) {
    //   if (dice === 6) {
    //     previousPlayer = activePlayer
    //     previousDice = dice
    //   } else {
    //     previousPlayer = null
    //     previousDice = null
    //   }
    //   //Add score
    //   roundScore += dice
    //   document.querySelector(`#current-${activePlayer}`).textContent = roundScore
    // } else {
    //   // next player
    //   nextPlayer()
    // }

    if(dice1 !== 1 && dice2 !== 1) {
      roundScore += dicesTotal
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore
    } else {
      nextPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore

    // Update the UI
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]

    var winningScore = document.querySelector('.final-score').value

    if(scores[activePlayer] >= (winningScore || 100)) {
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER !!'
      dice1Dom.style.display = 'none'
      dice2Dom.style.display = 'none'
      gamePlaying = false
    } else {
      nextPlayer()
    }
  }
})

function nextPlayer() {
  roundScore = 0
  document.getElementById(`current-${activePlayer}`).textContent = roundScore 

  document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')

  activePlayer = activePlayer === 0 ? 1 : 0

  document.querySelector(`.player-${activePlayer}-panel`).classList.add('active')
  dice1Dom.style.display = 'none'
  dice2Dom.style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
  scores = [0, 0]
  roundScore = 0
  activePlayer = 0
  gamePlaying = true
  
  dice1Dom.style.display = 'none'
  dice2Dom.style.display = 'none'
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  
  document.getElementById(`name-0`).textContent = 'Player 1'
  document.getElementById(`name-1`).textContent = 'Player 2'
}

// document.querySelector(`current-${activePlayer}`).textContent = dice
// var x = documentSelector("score-0").textContent