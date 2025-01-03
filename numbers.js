'use strict';
import console_color,{console_red,console_green,console_yellow,
	console_purple,console_blue,console_cyan} from './logColor.js';


//---------------------------------------------------------------------------------------------
//*                               ----- NUMBERS 4 -----
//---------------------------------------------------------------------------------------------


	const cardUnit = document.getElementById('card-unit');
		let numbers, winningNumber;
    var bgmHowl = new Howl({src: ['mp3/numbers.mp3'], loop: true, volume: 0.03}); 
    var jackpotHowl = new Howl({src: ['mp3/jackpot.mp3'], volume: 0.2}); 
		var swapHowl = new Howl({src: ['mp3/swap.mp3'], volume: 0.2}); 
    let isPlaying = false;
		let muted = false;
		bgmHowl.stop();
		
		function detectViewport() { //* init
			if(getComputedStyle(document.body).height < '720px') {
				cardUnit.classList.remove('largeViewport');
			} else { cardUnit.classList.add('largeViewport')}
		} detectViewport();

	function createWinningNumber() {
		[numbers, winningNumber] = [[],[]];
			for (let i = 0; i < 10; i++) {
				numbers[i] = i;
			}
		for (let i = 0; i < 4; i++) {
			winningNumber[i] = Math.floor(Math.random() * numbers.length);
		}
	} createWinningNumber();


	function assignWinningNumber() {
		const card = document.createElement('div');
			cardUnit.appendChild(card);
			card.classList.add('js_card');
		for (let i = 0; i < winningNumber.length; i++) {
			const columns = document.createElement('div');
				card.appendChild(columns);
				columns.classList.add('js_columns');
			for (let j = 0; j < 10; j++) {
				const rows = document.createElement('p');
					columns.appendChild(rows);
						rows.classList.add('js_rows');
					rows.textContent = numbers[j];
				if(numbers[j] === winningNumber[i]) {
					rows.classList.add('js_circle');
				}
			}
		}
	} assignWinningNumber();


	function clearBoard() {
		cardUnit.removeChild(cardUnit.firstChild);
		const rows = document.querySelectorAll('p');
		rows.forEach(row => {
			row.classList.remove('js_circle');
		});
	}


	const btnGetNum = document.getElementById('btn-getNum');
		btnGetNum.addEventListener('click', function () {
			clearBoard(); createWinningNumber(); assignWinningNumber();
			btnGetNum.classList.add('active');
			if(!isPlaying) { bgmHowl.play()}
			jackpotHowl.play();
			isPlaying = true;
			setTimeout(() => {
				btnGetNum.classList.remove('active');
			}, 150);
		});

	const themeLoto = document.querySelector('.theme-loto');
		themeLoto.style.setProperty('--theme', 'url("img/numbers4.png")');
		themeLoto.addEventListener('click', () => {
			if(!muted) { bgmHowl.mute(true); muted = true} 
			else { bgmHowl.mute(false); muted = false}
		});

	const btnToggle = document.querySelector('.btn-toggle');
		btnToggle.addEventListener('click', () => {
			bgmHowl.stop();
      isPlaying = false;
			swapHowl.play();
			setTimeout(() => { location.href = './index.html'}, 200);
		});

	window.addEventListener('resize', () => {
		detectViewport();
	});

//---------------------------------------------------------------------------------------------





















		
