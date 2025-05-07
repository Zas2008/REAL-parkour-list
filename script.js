const jumpList = document.getElementById('jumpList');
const jumpDetails = document.getElementById('jumpDetails');
const detailName = document.getElementById('detailName');
const detailCreator = document.getElementById('detailCreator');
const victorsList = document.getElementById('victorsList');
const closeBtn = document.querySelector('.close-btn');
const leaderboardBtn = document.getElementById('leaderboardBtn');
const leaderboardModal = document.getElementById('leaderboardModal');
const leaderboardList = document.getElementById('leaderboardList');
const closeLeaderboardBtn = document.getElementById('closeLeaderboardBtn');
const playerJumpsModal = document.getElementById('playerJumpsModal');
const playerJumpsList = document.getElementById('playerJumpsList');
const closePlayerJumpsBtn = document.getElementById('closePlayerJumpsBtn');

let jumps = [];
let leaderboardData = {};

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

closeBtn.addEventListener('click', () => {
    jumpDetails.style.display = 'none';
});

jumpDetails.addEventListener('click', (e) => {
    if (e.target === jumpDetails) {
        jumpDetails.style.display = 'none';
    }
});

function calculateLeaderboard() {
    leaderboardData = {};

    jumps.forEach(jump => {
        const jumpPoints = 150 - jump.id;

        if (!leaderboardData[jump.creator]) {
            leaderboardData[jump.creator] = { points: 0, jumps: [] };
        }
        leaderboardData[jump.creator].jumps.push(jump.name);

        jump.victors.forEach(victor => {
            if (!leaderboardData[victor]) {
                leaderboardData[victor] = { points: 0, jumps: [] };
            }
            leaderboardData[victor].points += jumpPoints;
            leaderboardData[victor].jumps.push(jump.name);
        });
    });

    const sortedLeaderboard = Object.keys(leaderboardData)
        .map(name => ({
            name,
            ...leaderboardData[name]
        }))
        .sort((a, b) => b.points - a.points);

    displayLeaderboard(sortedLeaderboard);
}

function displayLeaderboard(sortedLeaderboard) {
    leaderboardList.innerHTML = '';
    
    sortedLeaderboard.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${player.name} - ${player.points} points`;
        li.addEventListener('click', () => showPlayerJumps(player));
        leaderboardList.appendChild(li);
    });

    leaderboardModal.style.display = 'flex';
}

function showPlayerJumps(player) {
    playerJumpsList.innerHTML = '';
    player.jumps.forEach(jump => {
        const li = document.createElement('li');
        li.textContent = jump;
        playerJumpsList.appendChild(li);
    });
    playerJumpsModal.style.display = 'flex';
}

closeLeaderboardBtn.addEventListener('click', () => {
    leaderboardModal.style.display = 'none';
});

closePlayerJumpsBtn.addEventListener('click', () => {
    playerJumpsModal.style.display = 'none';
});

leaderboardBtn.addEventListener('click', () => {
    leaderboardModal.style.display = 'flex';
});

loadJumps();
