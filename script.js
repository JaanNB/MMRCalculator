document.addEventListener('DOMContentLoaded', () => {
    const mmrInput = document.getElementById('mmrInput');
    const estimatedMMR = document.getElementById('estimatedMMR');
    const rankDisplay = document.getElementById('rank');
    const winCount = document.getElementById('winCount');
    const loseCount = document.getElementById('loseCount');
    const winsToTarget = document.getElementById('winsToTarget');
    const doubleDown = document.getElementById('doubleDown');
    const winButton = document.getElementById('winButton');
    const loseButton = document.getElementById('loseButton');
    const calculateWinsButton = document.getElementById('calculateWinsButton');
    const targetRank = document.getElementById('targetRank');

    let currentMMR = 0;
    let wins = 0;
    let losses = 0;

    const ranks = {
        "Herald I": 0,
        "Herald II": 154,
        "Herald III": 308,
        "Herald IV": 462,
        "Herald V": 616,
        "Guardian": 770,
        "Guardian I": 770,
        "Guardian II": 924,
        "Guardian III": 1078,
        "Guardian IV": 1232,
        "Guardian V": 1386,
        "Crusader": 1540,
        "Crusader I": 1540,
        "Crusader II": 1694,
        "Crusader III": 1848,
        "Crusader IV": 2002,
        "Crusader V": 2156,
        "Archon": 2310,
        "Archon I": 2310,
        "Archon II": 2464,
        "Archon III": 2618,
        "Archon IV": 2772,
        "Archon V": 2926,
        "Legend I": 3080,
        "Legend": 3080,
        "Legend II": 3234,
        "Legend III": 3388,
        "Legend IV": 3542,
        "Legend V": 3696,
        "Ancient": 3850,
        "Ancient I": 3850,
        "Ancient II": 4004,
        "Ancient III": 4158,
        "Ancient IV": 4312,
        "Ancient V": 4466,
        "Divine": 4620,
        "Divine I": 4620,
        "Divine II": 4820,
        "Divine III": 5020,
        "Divine IV": 5220,
        "Divine V": 5420,
        "Immortal": 5620,
    };

    function updateMMR(change) {
        currentMMR += change;
        estimatedMMR.textContent = currentMMR;
        updateRank();
    }

    function updateRank() {
        for (let rank in ranks) {
            if (currentMMR >= ranks[rank]) {
                rankDisplay.textContent = rank;
            }
        }
    }

    function calculateWinsToTarget() {
        const targetMMR = ranks[targetRank.value];
        const mmrDifference = targetMMR - currentMMR;
        const winsNeeded = Math.ceil(mmrDifference / (doubleDown.checked ? 50 : 25));
        winsToTarget.textContent = winsNeeded > 0 ? winsNeeded : 0;
    }

    winButton.addEventListener('click', () => {
        const change = doubleDown.checked ? 50 : 25;
        updateMMR(change);
        wins++;
        winCount.textContent = wins;
    });

    loseButton.addEventListener('click', () => {
        const change = doubleDown.checked ? -50 : -25;
        updateMMR(change);
        losses++;
        loseCount.textContent = losses;
    });

    resetButton.addEventListener('click', () => {
        // Reset input fields and displayed values
        mmrInput.value = '';
        targetRank.value = 'Herald';
        currentMMR = 0;
        wins = 0;
        losses = 0;
        estimatedMMR.textContent = '0';
        rankDisplay.textContent = 'Herald';
        winCount.textContent = '0';
        loseCount.textContent = '0';
        winsToTarget.textContent = '0';
        doubleDown.checked = false; // Uncheck the Double Down checkbox
    });

    calculateWinsButton.addEventListener('click', calculateWinsToTarget);

    mmrInput.addEventListener('input', () => {
        currentMMR = parseInt(mmrInput.value) || 0;
        estimatedMMR.textContent = currentMMR;
        updateRank();
    });
});
