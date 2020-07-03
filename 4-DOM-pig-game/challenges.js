/*
GAME RULES (Pig Game) with 3 CHALLENGES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        var randDice1 = Math.floor(Math.random() * 6) + 1;
        var randDice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var dice1 = document.getElementById('dice-1');
        dice1.style.display = 'block';
        dice1.src = 'dice-' + randDice1 + '.png';
        
        var dice2 = document.getElementById('dice-2');
        dice2.style.display = 'block';
        dice2.src = 'dice-' + randDice2 + '.png';

        // 3. Update round score IF the rolled number was NOT a 1
        if ( randDice1 !== 1 && randDice2 !== 1 ){
            //Add score
            roundScore += (randDice1 + randDice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            //Next player
            document.getElementById('info-' + activePlayer).textContent = 'LOST CURRENT: Rolled number 1!';
            nextPlayer();
        }

        /*
        // 3. Update round score IF the rolled number was NOT a 1, (1.) and lose ALL if rolls two 6 in a row
        if ( lastDice === 6 && dice === 6 ) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            document.getElementById('info-' + activePlayer).textContent = 'LOST ALL: two six in a row!';
            nextPlayer();
        } else if ( dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDice = dice;
        }else{
            //Next player
            document.getElementById('info-' + activePlayer).textContent = 'LOST CURRENT: Rolled number 1!';
            nextPlayer();
        }
        */
    }
}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if there is a final score seted
        var input = document.querySelector('.final-score').value;
        var finalScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        input ? finalScore = input : finalScore = 100;

        // Check if player won the game
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            document.getElementById('info-' + activePlayer).textContent = '';
        } else {
            // Next player
            document.getElementById('info-' + activePlayer).textContent = 'PASSED!';
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    lastDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('info-' + activePlayer).textContent = '';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;

    lastDice = 0;

    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    //var x = document.querySelector('#score-0').textContent;
    //console.log(x);

    // Change an attribute of a html element (attribute already exists)
    //document.querySelector('.dice').src = 'dice-1.png';

    // Just like css (attribute do not exists) -> .dice { display: none;}    -> ('.dice').style.display = 'none'
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // If attribute exists, change directly (ex: .src = 'dice-1.png').
    // If attribute DO NOT exists, use 'style' keyword (ex: .style.src = 'dice-1.png').

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('info-0').textContent = 'Game Info Report!';
    document.getElementById('info-1').textContent = 'Game Info Report!';

}




/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

















