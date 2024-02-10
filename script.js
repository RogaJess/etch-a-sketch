document.addEventListener("DOMContentLoaded", () => {
	// Create initial 16x16 grid.
	createGrid(16);

	// Click event for changing grid size.
	document.getElementById("gridSizeButton").addEventListener("click", () => {
		// Prompt for new grid size with validation.
		let size = parseInt(prompt("Enter grid size per side (max 100):", 16));
		if (size > 0 && size <= 100) {
			createGrid(size);
		} else {
			alert("Number must be between 1 and 100.");
		}
	});
});

// Creates grid based on given size.
function createGrid(size) {
	const container = document.getElementById("gridContainer");
	// Clear grid and set up new grid dimensions.
	container.innerHTML = "";
	container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	// Add squares to grid with hover effect to change color.
	const squareSize = 700 / size; // Calculate square size.
	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");
		square.classList.add("gridSquare");
		square.style.width = square.style.height = `${squareSize}px`;
		square.addEventListener("mouseover", changeColor);
		container.appendChild(square);
	}
}

// Changes square's color on mouseover.
function changeColor(e) {
	let color = e.target.style.backgroundColor;
	// Assign random color if none, else darken.
	e.target.style.backgroundColor = color
		? darkenColor(color)
		: `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
}

// Generates a random RGB value.
function randomValue() {
	return Math.floor(Math.random() * 256);
}

// Darkens an RGB color.
function darkenColor(rgb) {
	// Extract RGB values, darken, and prevent below 0.
	let [r, g, b] = rgb
		.match(/\d+/g)
		.map(Number)
		.map((c) => Math.max(0, c - 25.5));
	return `rgb(${r}, ${g}, ${b})`;
}
