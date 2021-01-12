// Variables

const form = document.querySelector('#result-form');
const winResult = document.querySelector('#wins');
const lossResult = document.querySelector('#losses');
const resultTable = document.querySelector('#result-table');
const clearBtn = document.querySelector('#clear-results');
const recapSection = document.querySelector('#recap');
let i = 0;
let matchCount = 0;
let winTotal = 0;


// Load all event listeners
loadEventListeners();
// Load all event listeners function
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getResults);
  // Add result event
  form.addEventListener('submit', addResult);
  // Remove result event
  resultTable.addEventListener('click', removeResult);
  // Clear results
  clearBtn.addEventListener('click', clearResults);
}
// Get results from LS
function getResults() {
  let wins;
  let losses;
  if(localStorage.getItem('wins' === null)) {
    wins = [];
  } else {
    wins = JSON.parse(localStorage.getItem('wins'));
  }
  if(localStorage.getItem('losses' === null)) {
    losses = [];
  } else {
    losses = JSON.parse(localStorage.getItem('losses'));
  }
  // Loop and create table
  if(wins !== null) {
    for(let i = 0; i < wins.length; i++) {
      // Create table row element
      const row = document.createElement('tr');
      
      // Create index attribute
      row.setAttribute('data-index', i);
      
      // Add HTML to row
      row.innerHTML = `
        <td>Limited Event</td>
        <td>${wins[i]}</td>
        <td>${losses[i]}</td>
        <td><a class="delete"></a></td>
      `;
      
      // Append row to table
      resultTable.appendChild(row);
      
      // Update matchCount
      matchCount += Number(wins[i]) + Number(losses[i]);
      
      // Update winTotal
      winTotal += Number(wins[i]);
    }
  }
  // Update winrate
  updateWinRate(matchCount, winTotal);
}
// Add result
function addResult(e) {
  // Create table row element
  const row = document.createElement('tr');
  // Create index attribute
  row.setAttribute('data-index', i);
  // Add HTML to row
  row.innerHTML = `
    <td>Limited Event</td>
    <td>${winResult.value}</td>
    <td>${lossResult.value}</td>
    <td><a class="delete"></a></td>
  `;
  // Append row to table
  resultTable.appendChild(row);
  
  // Store result in LS
  storeResultInLocalStorage('wins', winResult.value);
  storeResultInLocalStorage('losses', lossResult.value);

  // Update matchCount
  matchCount += Number(winResult.value) + Number(lossResult.value);
  console.log('NEW MATCH COUNT ADDED ' + matchCount);
  
  // Update winTotal
  winTotal += Number(winResult.value);
  console.log('NEW WIN TOTAL ADDED ' + winTotal);
  
  // Update winrate
  updateWinRate(matchCount, winTotal);

  // Reset input values
  winResult.value = 0;
  lossResult.value = 0;
  i++;
  
  e.preventDefault();
}
// Store result in LS
function storeResultInLocalStorage(key, value) {
  let storage;
  if(localStorage.getItem(key) === null) {
    storage = [];
  } else {
    storage = JSON.parse(localStorage.getItem(key));
  }
  storage.push(value);
  localStorage.setItem(key, JSON.stringify(storage));
}
// Remove result
function removeResult(e) {
  if(e.target.classList.contains('delete')) {
    const links = document.querySelectorAll('#result-table tr');
    
    links.forEach(function(link) {
      const index = link.getAttribute('data-index');
      if(index === e.target.parentElement.parentElement.getAttribute('data-index')) {

        // Update matchCount
        const tempLoss = e.target.parentElement.previousElementSibling;
        const tempWin = tempLoss.previousElementSibling;
        
        matchCount -= Number(tempLoss.innerText) + Number(tempWin.innerText);

        // Update winTotal
        winTotal -= Number(tempWin.innerText);
        removeResultFromLocalStorage('wins', index);
        removeResultFromLocalStorage('losses', index);
        
        // Update winrate
        updateWinRate(matchCount, winTotal);
      }
    });    
    e.target.parentElement.parentElement.remove();
  }
}
// Remove result from LS
function removeResultFromLocalStorage(key, index) {
  let storage;
  if(localStorage.getItem(key) === null) {
    storage = [];
  } else {
    storage = JSON.parse(localStorage.getItem(key));
  }
  
  storage.splice(index, 1);

  localStorage.setItem(key, JSON.stringify(storage));
}
// Clear results
function clearResults() {
  while(resultTable.firstChild) {
    resultTable.removeChild(resultTable.firstChild)
  }

  // Update winrate
  matchCount = 0;
  winTotal = 0;
  updateWinRate(matchCount, winTotal);

  // Clear from LS
  clearResultsFromLocalStorage();
}
// Clear results from LS
function clearResultsFromLocalStorage() {
  localStorage.clear();
}
// Update winRate
function updateWinRate(matches, wins) {
  if(matches === 0){
    recapSection.innerText = "No match data";
  } else {
    recapSection.innerText = `Number of matches : ${matches}
      Number of wins : ${wins}
      Winrate : ${wins / matches * 100}%
    `;
  }
}