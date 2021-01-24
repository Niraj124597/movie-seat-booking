const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const movieSelect = document.getElementById('movie');

// let ticketPrice = parseInt(movieLists.value);
let ticketPrice = +movieSelect.value;

// This counts the number of seats selected and updates the total price
function updateSelectCount() {
  // This creates a NodeList of selected seats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  updateSelectCount();
});

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectCount();
  }
});