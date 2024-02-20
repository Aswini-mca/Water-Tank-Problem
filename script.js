// Function to calculate water units
function calculateWaterUnits(heights) {
    const n = heights.length;
    let leftMax = new Array(n).fill(0);
    let rightMax = new Array(n).fill(0);
    let totalWater = 0;

    // Calculate leftMax
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i - 1]);
    }

    // Calculate rightMax
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i + 1]);
    }

    // Calculate water units
    for (let i = 0; i < n; i++) {
        const waterUnits = Math.max(Math.min(leftMax[i], rightMax[i]) - heights[i], 0);
        totalWater += waterUnits;
    }

    return totalWater;
}

function calculateWater() {
    const input = document.getElementById('input').value;
    const heights = input.split(',').map(Number);
    const waterUnits = calculateWaterUnits(heights);
    document.getElementById('output').textContent = waterUnits + ' Units';

    // Input Visualization
    const inputSvg = document.getElementById('input-svg');
    inputSvg.innerHTML = '';
    const blockWidth = 40;
    const blockSpacing = 10;
    const waterHeight = 20;
    let x = 0;
    let y = 0;
    for (let i = 0; i < heights.length; i++) {
        const blockHeight = heights[i];
        const blockRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        blockRect.setAttribute('x', x);
        blockRect.setAttribute('y', y);
        blockRect.setAttribute('width', blockWidth);
        blockRect.setAttribute('height', blockHeight);
        blockRect.setAttribute('fill', '#f21347');
        inputSvg.appendChild(blockRect);

        const waterRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        waterRect.setAttribute('x', x);
        waterRect.setAttribute('y', y + blockHeight);
        waterRect.setAttribute('width', blockWidth);
        waterRect.setAttribute('height', waterHeight);
        waterRect.setAttribute('fill', '#8cdbed');
        inputSvg.appendChild(waterRect);

        x += blockWidth + blockSpacing;
        if (x >= inputSvg.getAttribute('width')) {
            x = 0;
            y += blockHeight + waterHeight;
        }
    }

    // Output Visualization
    const outputSvg = document.getElementById('output-svg');
    outputSvg.innerHTML = '';
    const outputRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    outputRect.setAttribute('x', 0);
    outputRect.setAttribute('y', 0);
    outputRect.setAttribute('width', waterUnits * (blockWidth + blockSpacing));
    outputRect.setAttribute('height', waterHeight);
    outputRect.setAttribute('fill', '#8cdbed');
    outputSvg.appendChild(outputRect);
}

