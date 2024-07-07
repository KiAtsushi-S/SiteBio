function openLink(url) {
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    const typeSound = document.getElementById('type-sound');
    const content = document.getElementById('content');

    const messages = [
        "root@Terminal:~# Loading HTML file...",
        "root@Terminal:~# Connecting to server...",
        "root@Terminal:~# Establishing secure connection...",
        "root@Terminal:~# Fetching IP address...",
        "root@Terminal:~# Resolving DNS...",
        "root@Terminal:~# Sending GET request...",
        "root@Terminal:~# Receiving response headers...",
        "root@Terminal:~# Decoding content...",
        "root@Terminal:~# Rendering HTML structure...",
        "root@Terminal:~# Loading CSS stylesheets...",
        "root@Terminal:~# Parsing JavaScript...",
        "root@Terminal:~# Executing scripts...",
        "root@Terminal:~# Loading images...",
        "root@Terminal:~# Fetching external resources...",
        "root@Terminal:~# Checking for updates...",
        "root@Terminal:~# Decrypting data...",
        "root@Terminal:~# Optimizing performance...",
        "root@Terminal:~# Compiling code...",
        "root@Terminal:~# Building component tree...",
        "root@Terminal:~# Setting up event listeners...",
        "root@Terminal:~# Handling user input...",
        "root@Terminal:~# Establishing database connection...",
        "root@Terminal:~# Retrieving data from database...",
        "root@Terminal:~# Processing data...",
        "root@Terminal:~# Rendering content...",
        "root@Terminal:~# Applying transformations...",
        "root@Terminal:~# Initializing plugins...",
        "root@Terminal:~# Configuring settings...",
        "root@Terminal:~# Validating input...",
        "root@Terminal:~# Executing background tasks...",
        "root@Terminal:~# Synchronizing with server...",
        "root@Terminal:~# Checking for errors...",
        "root@Terminal:~# Logging activities...",
        "Loading complete.",
        " ",
        "Errors: 0",
        "Bugs: 0",
        " ",
        "Done."
    ];

    let messageIndex = 0;

    const typeMessage = () => {
        if (messageIndex < messages.length) {
            loadingText.innerHTML += messages[messageIndex] + '\n';
            typeSound.currentTime = 0;
            typeSound.play();
            messageIndex++;
            const randomDelay = Math.random() * (250 - 50) + 50;
            setTimeout(typeMessage, randomDelay);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                content.style.opacity = '1';

                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 1000);
        }
    };

    setTimeout(typeMessage, 700);
});
