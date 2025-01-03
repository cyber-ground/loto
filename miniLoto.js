'use strict';
import {console_color,console_red,console_orange,console_yellow,console_green,
  console_blue,console_purple,console_magenta,console_cyan} from './logColor.js';


//---------------------------------------------------------------------------------------------
//*                               ----- MINI LOTO -----
//---------------------------------------------------------------------------------------------


  const cardUnit = document.getElementById('card-unit');
    let defaultNumber, numbers, winningNumber;
    var bgmHowl = new Howl({src: ['mp3/miniLoto.mp3'], loop: true, volume: 0.05}); 
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
    [defaultNumber, numbers, winningNumber] = [[],[],[]];
      for (let i = 0; i < 31; i++) {
        defaultNumber[i] = i + 1;
        numbers[i] = i + 1;
      }
      for (let i = 0; i < 5; i++) {
        winningNumber[i] = numbers.splice
        (Math.floor(Math.random() * numbers.length), 1)[0];
      }
    winningNumber.sort((a, b) => {
      return a - b;
    }); 
  } createWinningNumber();


  function createFramework() {
    const card = document.createElement('div');
      cardUnit.appendChild(card);
      card.classList.add('js_card');
    for (let i = 0; i < 4; i++) {
      const columns = document.createElement('div');
        card.appendChild(columns);
        columns.classList.add('js_columns');
      for (let j = 0; j < 10; j++) {
        const rows = document.createElement('p');
          columns.appendChild(rows);
        rows.classList.add('js_rows');
      }
    }
  } createFramework();

  
  function assignWinningNumber() {
    const rows = document.querySelectorAll('p');
      for (let i = 0; i < defaultNumber.length; i++) {
          rows[i].textContent = defaultNumber[i];
        winningNumber.forEach(num => {
          if(num === i + 1) {
            rows[i].classList.add('js_circle');
          }
        });
      }
    for (let i = 31; i < 40; i++) {
      rows[i].classList.remove('js_rows');
    }
  } assignWinningNumber();


  function clearBoard() {
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
    themeLoto.style.setProperty('--theme', 'url("img/miniloto.png")');
    themeLoto.addEventListener('click', () => {
      if(!muted) { bgmHowl.mute(true); muted = true} 
      else { bgmHowl.mute(false); muted = false}
		});

  const btnToggle = document.querySelector('.btn-toggle');
    btnToggle.addEventListener('click', () => {
      bgmHowl.stop();
      swapHowl.play();
      isPlaying = false;
      setTimeout(() => { location.href = './numbers.html'}, 500);
    });

  window.addEventListener('resize', () => {
    detectViewport();
  });

//---------------------------------------------------------------------------------------------

































