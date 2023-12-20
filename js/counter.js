// Get the counter elements
const counterElements = [
  document.getElementById('counter1'),
  document.getElementById('counter2'),
  document.getElementById('counter3')
];

// Set the target numbers and durations for each counter
const targets = [79, 100, 100]; // Change these to your desired target numbers
const durations = [3000, 4000, 5000]; // Change these to your desired durations (in milliseconds)

// Initialize counters
const counters = targets.map(() => ({ currentNumber: 0 }));

// Function to update a specific counter
function updateCounter(index) {
  const counter = counters[index];
  const targetNumber = targets[index];
  const increment = targetNumber / (durations[index] / 16);

  counter.currentNumber += increment;

  // Check if we reached or exceeded the target number
  if (counter.currentNumber >= targetNumber) {
    counter.currentNumber = targetNumber;
  }

  // Update the counter element's text content
  counterElements[index].textContent = Math.round(counter.currentNumber);

  // Continue the animation until the target is reached
  if (counter.currentNumber < targetNumber) {
    requestAnimationFrame(() => updateCounter(index));
  }
}

