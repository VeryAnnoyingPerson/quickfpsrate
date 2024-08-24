const fpsElement = document.getElementById('fps');
const refreshRateElement = document.getElementById('refreshRate');

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

function detectRefreshRate() {
    let frames = 0;
    let startTime = performance.now();

    function countFrames() {
        frames++;
        const now = performance.now();
        const elapsed = now - startTime;

        if (elapsed >= 1000) {
            const refreshRate = frames * (1000 / elapsed);
            refreshRateElement.textContent = refreshRate.toFixed(2) + ' Hz';
            frames = 0;
            startTime = now;
        }

        requestAnimationFrame(countFrames);
    }

    countFrames();
}

// Start the FPS calculation
requestAnimationFrame(calculateFPS);

// Detect the refresh rate
detectRefreshRate();
