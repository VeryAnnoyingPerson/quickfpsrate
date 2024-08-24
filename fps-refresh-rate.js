const fpsElement = document.getElementById('fps');

let frameTimes = [];
let lastTime = performance.now();

function calculateFPS(now) {
    const delta = now - lastTime;
    lastTime = now;

    const fps = 1000 / delta;
    frameTimes.push(fps);

    // Keep the array size manageable
    if (frameTimes.length > 100) {
        frameTimes.shift();
    }

    // Calculate average FPS
    const averageFPS = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;

    // Update FPS on the page
    fpsElement.textContent = averageFPS.toFixed(1);

    // Request next frame
    requestAnimationFrame(calculateFPS);
}

// Start the FPS calculation
requestAnimationFrame(calculateFPS);
