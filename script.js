function Timer(time, display) {
    let timer = time, hours, minutes, seconds;
    let isPaused = false;

    function updateDisplay() {
        if (!isPaused) {
            hours = parseInt(timer / 3600, 10);
            minutes = parseInt((timer % 3600) / 60, 10);
            seconds = parseInt(timer % 60, 10);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = hours + ":" + minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(intervalId);
                playBellSound();
            }
        }
    }

    function playBellSound() {
        const bellSound = document.getElementById("bellSound");
        let playCount = 0;
    
        bellSound.addEventListener("ended", function () {
            playCount++;
            if (playCount < 3) {
                bellSound.play();
            }
        });
    
        bellSound.play();
    }

    updateDisplay();

    const intervalId = setInterval(updateDisplay, 1000);

    const pauseButton = document.getElementById("pauseTimer");
    pauseButton.addEventListener("click", function () {

        if (isPaused == false) {
            isPaused = !isPaused;
            pauseButton.textContent = 'Return';
            pauseButton.style.backgroundColor = '#4caf50';
        } else {
            isPaused = !isPaused;
            pauseButton.textContent = 'Pause';
            pauseButton.style.backgroundColor = '#2597f4';
        }
    });

    const stopButton = document.getElementById("stopTimer");
    stopButton.addEventListener("click", function () {
        clearInterval(intervalId);
        display.textContent = "00:00:00";
        isPaused = false;
        pauseButton.textContent = 'Pause';
        pauseButton.style.backgroundColor = '#2597f4';
        document.getElementById("startTimer").disabled = false;
    });
}

window.onload = function () {
    const startButton = document.getElementById("startTimer");
    const pauseButton = document.getElementById("pauseTimer");
    const stopButton = document.getElementById("stopTimer");

    pauseButton.disabled = true;
    stopButton.disabled = true;

    startButton.addEventListener("click", function () {
        let time = parseInt(document.getElementById("timeReceived").value, 10);
        let display = document.querySelector("#timer");

        if (!isNaN(time)) {
            display.style.color = "#ffffff";
            display.style.fontSize = "3rem";

            Timer(time, display);

            startButton.disabled = true;
            pauseButton.disabled = false;
            stopButton.disabled = false;
        } else {
            display.textContent = "Por favor, insira um valor válido.";
            display.style.color = "#f44336";
            display.style.fontSize = "20px";
        }
    });
};
