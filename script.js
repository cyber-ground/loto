'use strict';
import console_color,{console_red,console_green,console_yellow,
  console_purple,console_blue,console_cyan} from './logColor.js';


//---------------------------------------------------------------------------------------------
//                                ----- LOTO 7 -----
//---------------------------------------------------------------------------------------------


  const cardUnit = document.getElementById('card-unit');
    let defaultNumber, numbers, winningNumber;

  function createWinningNumber() {
    [defaultNumber, numbers, winningNumber] = [[],[],[]];
      for (let i = 0; i < 37; i++) {
        defaultNumber[i] = i + 1;
        numbers[i] = i + 1;
      }
      for (let i = 0; i < 7; i++) {
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
    for (let i = 37; i < 40; i++) {
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
    setTimeout(() => {
      btnGetNum.classList.remove('active');
    }, 150);
  });


  const themeLoto = document.querySelector('.theme-loto');
    themeLoto.style.setProperty('--theme', 'url("img/loto7.png")');

  const btnToggle = document.querySelector('.btn-toggle');
    btnToggle.addEventListener('click', () => {
      window.location.href = './loto6.html'; 
    });

  

//---------------------------------------------------------------------------------------------














//---------------------------------------------------------------------------------------------

//                         ----- rotto7 ????????? ??????????????? version -----
//---------------------------------------------------------------------------------------------


  // const cardUnit = document.getElementById('js-card-unit');
  // let defaultNumber, numbers, winningNumber;

  // function createWinningNumber() {
  //   [defaultNumber, numbers, winningNumber] = [[],[],[]];
  //     for (let i = 0; i < 37; i++) {
  //       defaultNumber[i] = i + 1;
  //       numbers[i] = i + 1;
  //     }
  //     for (let i = 0; i < 7; i++) {
  //       winningNumber[i] = numbers.splice
  //       (Math.floor(Math.random() * numbers.length), 1)[0];
  //     }
  //   winningNumber.sort((a, b) => {
  //     return a - b;
  //   }); 
  // } createWinningNumber();


  // function createFramework() {
  //   const card = document.createElement('div');
  //     cardUnit.appendChild(card);
  //     card.classList.add('js_card');

  //   for (let i = 0; i < 4; i++) {
  //     const columns = document.createElement('div');
  //       card.appendChild(columns);
  //       columns.classList.add('js_marginLeft');
  //     for (let j = 0; j < 10; j++) {
  //       const rows = document.createElement('p');
  //         columns.appendChild(rows);
  //       rows.classList.add('js_rottoNumber');
  //     }
  //   }
  // } createFramework();



  // function assignWinningNumber() { 
  //     const rottoNum = document.querySelectorAll('p');
  //   for (let i = 0; i < defaultNumber.length; i++) {
  //       rottoNum[i].textContent = defaultNumber[i];
  //     winningNumber.forEach(num => {
  //       if(num === i + 1) {
  //         rottoNum[i].classList.add('js_circle');
  //       }
  //     });
  //   }
  //   for (let i = 37; i < 40; i++) {
  //     rottoNum[i].classList.remove('js_rottoNumber');
  //   }
  // } assignWinningNumber();


  // const btnGetNum = document.getElementById('js-btn');
  //   btnGetNum.addEventListener('click', function () {
  //       clearBoard(); createWinningNumber(); assignWinningNumber();
  //     });


  // function clearBoard() {
  //   const rottoNum = document.querySelectorAll('p');
  //   rottoNum.forEach(num => {
  //     num.classList.remove('js_circle');
  //   });
  // }






