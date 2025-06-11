// Game variables
const ingredients = {
    aggregate: 0,
    sand: 0,
    water: 0,
    coir: 0
};

const maxClicks = 10; // Maximum clicks per ingredient
let totalClicks = 0;

// DOM elements
const aggregateBtn = document.getElementById('aggregate-btn');
const sandBtn = document.getElementById('sand-btn');
const waterBtn = document.getElementById('water-btn');
const coirBtn = document.getElementById('coir-btn');
const mixBtn = document.getElementById('mix-btn');
const resetBtn = document.getElementById('reset-btn');

const aggregateFill = document.getElementById('aggregate-fill');
const sandFill = document.getElementById('sand-fill');
const waterFill = document.getElementById('water-fill');
const coirFill = document.getElementById('coir-fill');

const resultMessage = document.getElementById('result-message');
const resultImage = document.getElementById('result-image');

const perfectModal = document.getElementById('perfect-modal');
const closeModal = document.querySelector('.close-modal');

// Event listeners
aggregateBtn.addEventListener('click', () => addIngredient('aggregate'));
sandBtn.addEventListener('click', () => addIngredient('sand'));
waterBtn.addEventListener('click', () => addIngredient('water'));
coirBtn.addEventListener('click', () => addIngredient('coir'));

mixBtn.addEventListener('click', mixConcrete);
resetBtn.addEventListener('click', resetGame);

closeModal.addEventListener('click', () => {
    perfectModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === perfectModal) {
        perfectModal.style.display = 'none';
    }
});

// Functions
function addIngredient(ingredient) {
    if (ingredients[ingredient] < maxClicks && totalClicks < maxClicks * 4) {
        ingredients[ingredient]++;
        totalClicks++;
        updateDisplay();
    } else {
        alert(`You've added the maximum amount of ${ingredient}! Try mixing or resetting.`);
    }
}

function updateDisplay() {
    // Calculate percentages for each ingredient
    const total = Math.max(1, Object.values(ingredients).reduce((a, b) => a + b));
    
    const aggregatePercent = (ingredients.aggregate / total) * 100;
    const sandPercent = (ingredients.sand / total) * 100;
    const waterPercent = (ingredients.water / total) * 100;
    const coirPercent = (ingredients.coir / total) * 100;
    
    // Update the fill bars
    aggregateFill.style.height = `${aggregatePercent}%`;
    sandFill.style.height = `${sandPercent}%`;
    waterFill.style.height = `${waterPercent}%`;
    coirFill.style.height = `${coirPercent}%`;
}

function mixConcrete() {
    if (totalClicks === 0) {
        resultMessage.textContent = "Please add some ingredients first!";
        resultImage.style.display = 'none';
        return;
    }
    
    // Calculate ratios
    const total = Object.values(ingredients).reduce((a, b) => a + b);
    const aggregateRatio = ingredients.aggregate / total;
    const sandRatio = ingredients.sand / total;
    const waterRatio = ingredients.water / total;
    const coirRatio = ingredients.coir / total;
    
    // Determine result based on ratios
    if (waterRatio > 0.25) {
        // Too much water
        showResult(
            "Too much water! Your concrete is weak and porous.",
            "https://images.unsplash.com/photo-1739286254220-217aab9c54cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZCUyMGNhdHxlbnwwfDJ8MHx8fDA%3D"
        );
    } else if (coirRatio > 0.25) {
        // Too much coir
        showResult(
            "Too much coconut coir! The mixture lacks cohesion.",
            "https://images.unsplash.com/photo-1739286254220-217aab9c54cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZCUyMGNhdHxlbnwwfDJ8MHx8fDA%3D"
        );
    } else if (sandRatio > 0.5) {
        // Too much sand
        showResult(
            "Too much sand! Your concrete lacks strength.",
            "https://images.unsplash.com/photo-1739286254220-217aab9c54cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZCUyMGNhdHxlbnwwfDJ8MHx8fDA%3D"
        );
    } else if (aggregateRatio < 0.4) {
        // Not enough aggregate
        showResult(
            "Not enough aggregate! The mixture is too fine.",
            "https://images.unsplash.com/photo-1739286254220-217aab9c54cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhZCUyMGNhdHxlbnwwfDJ8MHx8fDA%3D"
        );
    } else if (Math.abs(waterRatio - 0.15) < 0.05 && 
                Math.abs(coirRatio - 0.1) < 0.05 &&
                Math.abs(sandRatio - 0.3) < 0.05 &&
                Math.abs(aggregateRatio - 0.45) < 0.05) {
        // Perfect mix!
        perfectModal.style.display = 'flex';
        showResult(
            "Perfect mix! Ideal coconut coir reinforced concrete.",
            "images/Brick.jpg"
        );
    } else if (coirRatio < 0.05) {
        // No coir
        showResult(
            "Standard concrete mix. Try adding some coconut coir for better performance!",
            "https://images.unsplash.com/photo-1709398668435-bc1222eb405e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHklMjBjYXR8ZW58MHwyfDB8fHww"
        );
    } else {
        // Acceptable but not perfect
        showResult(
            "Good mix! The concrete will work but could be optimized.",
            "https://images.unsplash.com/photo-1722842655644-869cb12728e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhcHB5JTIwY2F0fGVufDB8MnwwfHx8MA%3D%3D"
        );
    }
}

function showResult(message, imageUrl) {
    resultMessage.textContent = message;
    resultImage.src = imageUrl;
    resultImage.style.display = 'block';
}

function resetGame() {
    // Reset all counts
    ingredients.aggregate = 0;
    ingredients.sand = 0;
    ingredients.water = 0;
    ingredients.coir = 0;
    totalClicks = 0;
    
    // Reset display
    aggregateFill.style.height = '0%';
    sandFill.style.height = '0%';
    waterFill.style.height = '0%';
    coirFill.style.height = '0%';
    
    // Clear result
    resultMessage.textContent = '';
    resultImage.style.display = 'none';
}