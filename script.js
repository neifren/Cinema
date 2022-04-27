'use strict'
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

console.log("Hey there!!");

let ticketPrice = +movieSelect.value;

//Save selected mive index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSeletedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const seletedSeatsCount = selectedSeats.length;
    
    count.innerText = seletedSeatsCount;
    total.innerText = seletedSeatsCount * ticketPrice;
    
}        

//Get data from localstorage and populate
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    };

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSeletedCount();
});

//Seat click event
container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');

        updateSeletedCount();
    }
});

//Initial count and total set
updateSeletedCount();