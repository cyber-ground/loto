'use strict';
import {console_color,console_red,console_orange,console_yellow,console_green,
	console_blue,console_purple,console_magenta,console_cyan} from './logColor.js';


//---------------------------------------------------------------------------------------------
//*                               ----- NUMBERS 4 -----
//---------------------------------------------------------------------------------------------

	const container = document.querySelector('.container');
	const cardUnit = document.getElementById('card-unit');
  let portrait = window.matchMedia('(orientation: portrait)').matches;
	let numbers, winningNumber;
	var bgmHowl = new Howl({src: ['mp3/numbers.mp3'], loop: true, volume: 0.03}); 
	var jackpotHowl = new Howl({src: ['mp3/jackpot.mp3'], volume: 0.2}); 
	var swapHowl = new Howl({src: ['mp3/swap.mp3'], volume: 0.2}); 
  let [isPlaying, muted, touch] = [false, false, false];
  let id_bgmHowl, defaultHeight, menubar;
	bgmHowl.stop();
		
  function init() { 
    container.addEventListener('touchstart', e => e.preventDefault());
    if(localStorage.hasOwnProperty('menubarHidden')) {
      cardUnit.classList.add('largeViewport');
      portrait = false; defaultHeight = innerHeight;
    }
    if(localStorage.hasOwnProperty('menubarHidden')) return;
    if(portrait) { defaultHeight = innerHeight}
    else { defaultHeight = innerWidth}
  } init();

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

  function detectViewport() { 
    if(portrait) {
      if(innerHeight > defaultHeight) {
        menubar = false;
        cardUnit.classList.add('largeViewport');
        localStorage.setItem('menubarHidden', 'hidden');
      } else if(innerHeight === defaultHeight) { 
        menubar = true;
        cardUnit.classList.remove('largeViewport');
        localStorage.removeItem('menubarHidden', 'hidden');
      }
    } 
    falseOrientation();
  } detectViewport();

  function falseOrientation() {
    if(!portrait) {
      if(innerHeight > defaultHeight) {
        menubar = false;
        cardUnit.classList.add('largeViewport');
        localStorage.setItem('menubarHidden', 'hidden');
      } else if(innerHeight < defaultHeight) { 
        menubar = true;
        cardUnit.classList.remove('largeViewport');
        localStorage.removeItem('menubarHidden', 'hidden');
      }
      if(menubar) {
        portrait = window.matchMedia('(orientation: portrait)').matches;
        if(portrait) { defaultHeight = innerHeight}
      }
    }
  } 

  //* event ------------------------------------------

	const btnGetNum = document.getElementById('btn-getNum');
		btnGetNum.addEventListener('click', function () {
			clearBoard(); createWinningNumber(); assignWinningNumber();
			btnGetNum.classList.add('active');
			if(!isPlaying) { id_bgmHowl = bgmHowl.play()}
			jackpotHowl.play(); isPlaying = true;
			setTimeout(() => { btnGetNum.classList.remove('active')}, 150);
		});

	const themeLoto = document.querySelector('.theme-loto');
		themeLoto.style.setProperty('--theme', 'url("img/numbers4.png")');
		themeLoto.addEventListener('click', () => {
			if(!isPlaying) return;
      if(!muted) { bgmHowl.fade(0.03, 0, 300, id_bgmHowl); muted = true} 
      else { bgmHowl.volume(0.03); muted = false}
		});

	const btnToggle = document.querySelector('.btn-toggle');
		btnToggle.addEventListener('click', () => {
			bgmHowl.stop(); swapHowl.play();
			setTimeout(() => { location.href = './index.html'}, 500);
		});

	const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
      btn.addEventListener('touchstart', (e) => {
        if(!touch) { touch = true; e.stopPropagation()}
      });
      btn.addEventListener('mousedown', () => { touch = true});
      btn.addEventListener('touchend', () => {
        setTimeout(() => { touch = false}, 200);
      });
    });

	window.addEventListener('resize', () => {
		detectViewport();
	});

//---------------------------------------------------------------------------------------------





















		
