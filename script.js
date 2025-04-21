// DOM elements
const jumpList = document.getElementById('jumpList');
const jumpDetails = document.getElementById('jumpDetails');
const detailName = document.getElementById('detailName');
const detailCreator = document.getElementById('detailCreator');
const victorsList = document.getElementById('victorsList');
const closeBtn = document.querySelector('.close-btn');
const leaderboardBtn = document.getElementById('leaderboardBtn');
const leaderboard = document.getElementById('leaderboard');
const leaderboardList = document.getElementById('leaderboardList');

let jumps = [];
let leaderboardData = {};

// Fetch jumps from JSON file
async function loadJumps() {
    try {
        const response = await fetch('jumps.json');
        if (!response.ok) {
            throw new Error('Failed to load jumps');
        }
        jumps = await response.json();
        displayJumps();
        calculateLeaderboard();
    } catch (error) {
        console.error('Error loading jumps:', error);
        // Fallback to sample data if JSON fails to load
        jumps = [
            {
                id: 1,
                name: "Something failed to load!",
                creator: "contact zas08 on discord if you see this repeatedly",
                victors: ["lol", "Skibiditoiletmaster1023048234908"]
            }
        ];
        displayJumps();
        calculateLeaderboard();
    }
}

// Display jumps
function displayJumps() {
    jumpList.innerHTML = '';
    
    jumps.sort((a, b) => a.id - b.id).forEach(jump => {
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
    jump.victors.forEach((victor) => {
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

// Calculate leaderboard points
function calculateLeaderboard() {
    leaderboardData = {};

    // Iterate over all jumps to collect data
    jumps.forEach(jump => {
        // Add points for the creator
        if (!leaderboardData[jump.creator]) {
            leaderboardData[jump.creator] = { points: 0, jumps: [] };
        }
        leaderboardData[jump.creator].points += 150;  // Creator always gets 150 points
        leaderboardData[jump.creator].jumps.push(jump.name);

        // Add points for each victor
        jump.victors.forEach(victor => {
            if (!leaderboardData[victor]) {
                leaderboardData[victor] = { points: 0, jumps: [] };
            }
            leaderboardData[victor].points += 150;  // Start with 150 points for the first victor
            leaderboardData[victor].jumps.push(jump.name);
        });
    });

    // Sort the leaderboard by points
    const sortedLeaderboard = Object.keys(leaderboardData)
        .map(player => ({
            name: player,
            ...leaderboardData[player]
        }))
        .sort((a, b) => b.points - a.points); // Sort by points in descending order

    // Display the leaderboard
    displayLeaderboard(sortedLeaderboard);
}

// Display leaderboard
function displayLeaderboard(sortedLeaderboard) {
    leaderboardList.innerHTML = '';
    
    sortedLeaderboard.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${player.name} - ${player.points} points`;
        li.addEventListener('click', () => showPlayerJumps(player));
        leaderboardList.appendChild(li);
    });
}

// Show jumps for a selected player
function showPlayerJumps(player) {
    alert(`${player.name} appears in the following jumps:\n- ${player.jumps.join('\n- ')}`);
}

// Show/hide leaderboard when clicking the button
leaderboardBtn.addEventListener('click', () => {
    leaderboard.style.display = leaderboard.style.display === 'none' || !leaderboard.style.display ? 'block' : 'none';
});

// Initialize
loadJumps();

