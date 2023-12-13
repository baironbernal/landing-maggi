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

// Start the counters animation
counters.forEach((counter, index) => {
  updateCounter(index);
});

// Create an Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find the index of the current counter container
      const index = counterContainers.indexOf(entry.target);
      if (index !== -1) {
        // Start the counter animation for the corresponding index
        updateCounter(index);
        // Unobserve the target to avoid redundant animations
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 }); // Adjust the threshold as needed

// Observe each counter container
counterContainers.forEach(container => {
  observer.observe(container);
});