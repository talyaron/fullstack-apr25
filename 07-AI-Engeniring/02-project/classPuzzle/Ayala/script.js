document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const dropContent = document.getElementById('dropContent');
    const previewImage = document.getElementById('previewImage');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');
    const statusText = document.getElementById('statusText');
    const guessResult = document.getElementById('guessResult');

    let currentImageData = null;

    // --- Drag and Drop ---
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // --- Click to upload ---
    dropZone.addEventListener('click', (e) => {
        if (e.target !== browseBtn) {
            fileInput.click();
        }
    });

    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // --- Handle file ---
    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            statusText.textContent = 'Please upload an image file!';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            currentImageData = e.target.result;
            previewImage.src = currentImageData;
            previewImage.hidden = false;
            dropContent.hidden = true;
            resetGame();
        };
        reader.readAsDataURL(file);
    }

    // --- Game Logic ---
    clearBtn.addEventListener('click', () => {
        currentImageData = null;
        previewImage.src = '';
        previewImage.hidden = true;
        dropContent.hidden = false;
        fileInput.value = '';
        resetGame();
    });

    submitBtn.addEventListener('click', () => {
        handleSubmission();
    });

    function resetGame() {
        guessResult.textContent = '';
        statusText.textContent = 'Ready to guess...';
        submitBtn.disabled = false;
    }

    async function handleSubmission() {
        if (!currentImageData) {
            statusText.textContent = "Please upload an image first!";
            setTimeout(() => {
                if (statusText.textContent === "Please upload an image first!") {
                    statusText.textContent = "Ready to guess...";
                }
            }, 2000);
            return;
        }

        submitBtn.disabled = true;
        statusText.textContent = 'AI is thinking...';
        guessResult.textContent = '';

        try {
            const response = await fetch('http://localhost:3000/api/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: currentImageData })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const guess = data.guess;

            statusText.textContent = 'I think it is a...';

            // Typewriter effect for result
            let i = 0;
            guessResult.textContent = '';
            const typeInterval = setInterval(() => {
                guessResult.textContent += guess.charAt(i);
                i++;
                if (i > guess.length - 1) {
                    clearInterval(typeInterval);
                    submitBtn.disabled = false;
                }
            }, 50);

        } catch (error) {
            console.error('Error:', error);
            statusText.textContent = 'Error connecting to AI.';
            guessResult.textContent = 'Try again?';
            submitBtn.disabled = false;
        }
    }
});
