// Definizione delle unità per ogni categoria
const units = {
    length: {
        'metri': 1,
        'chilometri': 0.001,
        'centimetri': 100,
        'millimetri': 1000,
        'miglia': 0.000621371,
        'yard': 1.09361,
        'piedi': 3.28084,
        'pollici': 39.3701
    },
    weight: {
        'chilogrammi': 1,
        'grammi': 1000,
        'milligrammi': 1000000,
        'tonnellate': 0.001,
        'libbre': 2.20462,
        'once': 35.274
    },
    temperature: {
        'Celsius': 'C',
        'Fahrenheit': 'F',
        'Kelvin': 'K'
    },
    volume: {
        'litri': 1,
        'millilitri': 1000,
        'metri cubi': 0.001,
        'galloni (US)': 0.264172,
        'galloni (UK)': 0.219969,
        'pinte (US)': 2.11338,
        'once fluide (US)': 33.814
    },
    area: {
        'metri quadrati': 1,
        'chilometri quadrati': 0.000001,
        'ettari': 0.0001,
        'acri': 0.000247105,
        'piedi quadrati': 10.7639,
        'centimetri quadrati': 10000
    },
    speed: {
        'metri al secondo': 1,
        'chilometri all\'ora': 3.6,
        'miglia all\'ora': 2.23694,
        'nodi': 1.94384,
        'piedi al secondo': 3.28084
    },
    time: {
        'secondi': 1,
        'minuti': 1/60,
        'ore': 1/3600,
        'giorni': 1/86400,
        'settimane': 1/604800,
        'anni': 1/31536000
    },
    pressure: {
        'Pascal': 1,
        'kPa': 0.001,
        'MPa': 0.000001,
        'bar': 0.00001,
        'kg/cm²': 0.0000101972,
        'psi': 0.000145038,
        'atm': 0.00000986923,
        'mmHg': 0.00750062
    },
    force: {
        'Newton': 1,
        'kN': 0.001,
        'MN': 0.000001,
        'kgf': 0.101972,
        'lbf': 0.224809,
        'dyne': 100000
    },
    energy: {
        'Joule': 1,
        'kJ': 0.001,
        'MJ': 0.000001,
        'kWh': 0.000000277778,
        'calorie': 0.239006,
        'kcal': 0.000239006
    },
    power: {
        'Watt': 1,
        'kW': 0.001,
        'MW': 0.000001,
        'HP (metrici)': 0.00135962,
        'HP (US)': 0.00134102,
        'BTU/h': 3.41214
    },
    torque: {
        'Nm': 1,
        'kgf·m': 0.101972,
        'lbf·ft': 0.737562,
        'lbf·in': 8.85075,
        'dyne·cm': 10000000
    }
};

// Inizializzazione al caricamento della pagina
window.onload = function() {
    updateUnits();
};

// Aggiorna le opzioni delle unità in base alla categoria selezionata
function updateUnits() {
    const category = document.getElementById('category').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    // Salva le selezioni correnti
    const currentFromUnit = fromUnit.value;
    const currentToUnit = toUnit.value;

    // Pulisci i dropdown
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    // Popola i dropdown con le nuove unità
    const unitList = Object.keys(units[category]);
    unitList.forEach(unit => {
        const option1 = new Option(unit, unit);
        const option2 = new Option(unit, unit);
        fromUnit.add(option1);
        toUnit.add(option2);
    });

    // Seleziona la seconda unità come default per "A"
    if (unitList.length > 1) {
        toUnit.selectedIndex = 1;
    }

    // Resetta i valori
    document.getElementById('fromValue').value = '';
    document.getElementById('toValue').value = '';
    document.getElementById('resultText').textContent = '';
}

// Scambia le unità
function swapUnits() {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');

    // Scambia le selezioni
    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;

    // Scambia i valori
    const tempValue = fromValue.value;
    fromValue.value = toValue.value;
    toValue.value = tempValue;

    // Ricalcola la conversione
    convert();
}

// Esegue la conversione
function convert() {
    const category = document.getElementById('category').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const toValueInput = document.getElementById('toValue');
    const resultText = document.getElementById('resultText');

    // Verifica che sia inserito un valore valido
    if (isNaN(fromValue) || fromValue === '') {
        toValueInput.value = '';
        resultText.textContent = '';
        return;
    }

    let result;

    // Gestione speciale per la temperatura
    if (category === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        // Conversione standard: converti in unità base, poi nell'unità di destinazione
        const baseValue = fromValue / units[category][fromUnit];
        result = baseValue * units[category][toUnit];
    }

    // Arrotonda il risultato a 6 cifre decimali
    result = Math.round(result * 1000000) / 1000000;

    // Mostra il risultato
    toValueInput.value = result;
    resultText.textContent = `${fromValue} ${fromUnit} = ${result} ${toUnit}`;
}

// Conversione speciale per la temperatura
function convertTemperature(value, fromUnit, toUnit) {
    // Prima converti in Celsius
    let celsius;

    if (fromUnit === 'Celsius') {
        celsius = value;
    } else if (fromUnit === 'Fahrenheit') {
        celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'Kelvin') {
        celsius = value - 273.15;
    }

    // Poi converti da Celsius all'unità di destinazione
    let result;

    if (toUnit === 'Celsius') {
        result = celsius;
    } else if (toUnit === 'Fahrenheit') {
        result = celsius * 9/5 + 32;
    } else if (toUnit === 'Kelvin') {
        result = celsius + 273.15;
    }

    return result;
}

// Permetti l'invio con il tasto Invio
document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    if (fromValue) {
        fromValue.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                convert();
            }
        });
    }
});
