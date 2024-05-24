document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm') as HTMLFormElement;
    const habitsContainer = document.querySelector('.habits') as HTMLDivElement;

    habitForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const habitInput = (document.getElementById('habit') as HTMLInputElement).value;
        const dateInput = (document.getElementById('datestopped') as HTMLInputElement).value;

        if (habitInput && dateInput) {
            const newHabit = {
                habit: habitInput,
                dateStopped: dateInput
            };

            try {
                const response = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newHabit)
                });

                if (response.ok) {
                    const addedHabit = await response.json();
                    displayHabit(addedHabit);
                } else {
                    console.error('Failed to add habit');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Please fill in all fields');
        }
    });

    async function fetchHabits() {
        try {
            const response = await fetch('http://localhost:3000/posts');
            const data = await response.json();
            data.forEach(displayHabit);
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    }

    function displayHabit(habit: { habit: string, dateStopped: string }) {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit');
        habitElement.innerHTML = ` <ion-icon name="accessibility-outline"></ion-icon><p>Habit: ${habit.habit}</p><p>Date Stopped: ${habit.dateStopped}</p><button>delete</button>`;
        habitsContainer.appendChild(habitElement);
    }

    fetchHabits();
});
