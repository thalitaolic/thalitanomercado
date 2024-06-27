document.addEventListener('DOMContentLoaded', (event) => {
    loadTrades();
    renderChart();
    loadTheme();
});

document.getElementById('trade-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('trade-date').value;
    const asset = document.getElementById('trade-asset').value;
    const type = document.getElementById('trade-type').value;
    const entry = document.getElementById('trade-entry').value;
    const exit = document.getElementById('trade-exit').value;
    const result = document.getElementById('trade-result').value;
    
    const trade = { date, asset, type, entry, exit, result };
    addTradeToTable(trade);
    saveTrade(trade);
    document.getElementById('trade-form').reset();
    renderChart();
});

function addTradeToTable(trade) {
    const tableBody = document.getElementById('trade-log-body');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${trade.date}</td>
        <td>${trade.asset}</td>
        <td>${trade.type}</td>
        <td>${trade.entry}</td>
        <td>${trade.exit}</td>
        <td>${trade.result}</td>
    `;
    
    tableBody.appendChild(row);
}

function saveTrade(trade) {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades.push(trade);
    localStorage.setItem('trades', JSON.stringify(trades));
}

function loadTrades() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades.forEach(trade => addTradeToTable(trade));
}

function renderChart() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    let results = trades.map(trade => parseFloat(trade.result));
    let labels = trades.map(trade => trade.date);

    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Resultado dos Trades',
                data: results,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    let theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    this.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
});

function loadTheme() {
    let theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('theme-toggle').textContent = 'Modo Claro';
    } else {
        document.getElementById('theme-toggle').textContent = 'Modo Escuro';
    }
}
