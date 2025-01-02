const fs = require('fs');

function convertValue(base, encodedValue) {
    return parseInt(encodedValue, base);
}

function computePolynomial(points, x0) {
    let result = 0;
    const numPoints = points.length;

    for (let i = 0; i < numPoints; i++) {
        let term = points[i].y;
        for (let j = 0; j < numPoints; j++) {
            if (i !== j) {
                term *= (x0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return Math.round(result); 
}

function calculateSecret(jsonFilePath) {
    const inputData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const numRoots = inputData.keys.n;
    const minRoots = inputData.keys.K;
    const rootsList = [];

    for (let key in inputData) {
        if (!isNaN(key)) {
            const xValue = parseInt(key);
            const baseValue = parseInt(inputData[key].base);
            const encodedValue = inputData[key].value;
            const decodedValue = convertValue(baseValue, encodedValue);
            rootsList.push({ x: xValue, y: decodedValue });
        }
    }

    rootsList.sort((a, b) => a.x - b.x);
    const selectedRoots = rootsList.slice(0, minRoots);

    const secretConstant = computePolynomial(selectedRoots, 0);
    console.log(`Secret (c): ${secretConstant}`);
}

calculateSecret('C:/Users/deeks/OneDrive/Desktop/ShamirSecretProject/ts1.json');
calculateSecret('C:/Users/deeks/OneDrive/Desktop/ShamirSecretProject/ts2.json');

