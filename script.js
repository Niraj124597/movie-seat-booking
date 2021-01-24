const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const movieSelect = document.getElementById('movie');

populateUI();

// let ticketPrice = parseInt(movieLists.value);
let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// This counts the number of seats selected and updates the total price
function updateSelectCount() {
  // This creates a NodeList of selected seats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // This conversts the NodeList into an array
  const selectedSeatsArr = [...selectedSeats];
  // This gives an array of index of selected seat
  const seatsIndex = selectedSeatsArr.map(seat => [...seats].indexOf(seat));
  // It stores the seatsIndex to local storage
  localStorage.setItem('selectedSeatsIndex', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  // This value in local storage is string
  const seatsIndex = localStorage.getItem('selectedSeatsIndex'); // "[5, 6]" 
  // This converts string into an array
  const seatsIndexArr = JSON.parse(seatsIndex); // [5, 6]
  if (seatsIndexArr !== null && seatsIndexArr.length > 0) {
    seats.forEach((seat, index) => {
      if (seatsIndexArr.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // This gives a string
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectCount();
});

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectCount();
  }
});

updateSelectCount();