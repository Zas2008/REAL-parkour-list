// Sample jump data - this will be replaced by jumps.json
let jumps = [
    {
        id: 1,
        name: "crooked",
        creator: "thomgram",
        victors: [""]
    }
];

// DOM elements
const jumpList = document.getElementById('jumpList');
const jumpDetails = document.getElementById('jumpDetails');
const detailName = document.getElementById('detailName');
const detailCreator = document.getElementById('detailCreator');
const victorsList = document.getElementById('victorsList');
const closeBtn = document.querySelector('.close-btn');

// Display jumps
function displayJumps() {
    jumpList.innerHTML = '';
    
    jumps.forEach(jump => {
        const jumpElement = document.createElement('div');
        jumpElement.className = 'jump-item';
        jumpElement.innerHTML = `
            <div class="jump-number">#${jump.id}</div>
            <div class="jump-info">
                <h2>${jump.name}</h2>
                <p class="creator">${jump.creator}</p>
            </div>
        `;
        
        jumpElement.addEventListener('click', () => showJumpDetails(jump));
        jumpList.appendChild(jumpElement);
    });
}

// Show jump details
function showJumpDetails(jump) {
    detailName.textContent = jump.name;
    detailCreator.textContent = jump.creator;
    
    victorsList.innerHTML = '';
    jump.victors.forEach((victor, index) => {
        const li = document.createElement('li');
        li.textContent = victor;
        victorsList.appendChild(li);
    });
    
    jumpDetails.style.display = 'flex';
}

// Close details
closeBtn.addEventListener('click', () => {
    jumpDetails.style.display = 'none';
});

// Close when clicking outside
jumpDetails.addEventListener('click', (e) => {
    if (e.target === jumpDetails) {
        jumpDetails.style.display = 'none';
    }
});

// Initialize
displayJumps();
