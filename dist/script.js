"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm');
    const habitsContainer = document.querySelector('.habits');
    habitForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const habitInput = document.getElementById('habit').value;
        const dateInput = document.getElementById('datestopped').value;
        if (habitInput && dateInput) {
            const newHabit = {
                habit: habitInput,
                dateStopped: dateInput
            };
            try {
                const response = yield fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newHabit)
                });
                if (response.ok) {
                    const addedHabit = yield response.json();
                    displayHabit(addedHabit);
                }
                else {
                    console.error('Failed to add habit');
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            alert('Please fill in all fields');
        }
    }));
    function fetchHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/posts');
                const data = yield response.json();
                data.forEach(displayHabit);
            }
            catch (error) {
                console.error('Error fetching habits:', error);
            }
        });
    }
    function displayHabit(habit) {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit');
        habitElement.innerHTML = ` <ion-icon name="accessibility-outline"></ion-icon><p>Habit: ${habit.habit}</p><p>Date Stopped: ${habit.dateStopped}</p><button>delete</button>`;
        habitsContainer.appendChild(habitElement);
    }
    fetchHabits();
});
