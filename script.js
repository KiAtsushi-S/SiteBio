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

    // Добавляем перемещение для блокнота
    dragElement(document.getElementById("notepad-window"), document.getElementById("notepad-bar"));

    // Обновление времени
    updateClock();
    setInterval(updateClock, 10);
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const timeString = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    document.getElementById('time').textContent = timeString;
}

function openTerminal() {
    const terminalWindow = document.getElementById('terminal-window');
    terminalWindow.style.display = 'block';
    showWelcomeMessage();
    focusTerminal();
}

function closeTerminal() {
    const terminalWindow = document.getElementById('terminal-window');
    terminalWindow.style.display = 'none';
    document.getElementById('terminal-output').innerHTML = ''; 
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        const command = input.value.trim();

        processCommand(command, output);

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
}

async function processCommand(command, output) {
    const prefix = 'root@Terminal:~# ';
    output.innerHTML += `${prefix}${command}\n`;

    switch (command.trim()) {
        case 'help':
            output.innerHTML += `Available commands:\n\n  help,\n  osint_ip [IP],\n  clear,\n  calculate [expression],\n start [notepad],\n  exit\n`;
            break;
        case 'clear':
            output.innerHTML = '';
            output.innerHTML += `Terminal 2.7.3 Beta\n\nFor more details use "help"\n\n`;
            break;
        case 'exit':
            closeTerminal();
            break;
        case 'start notepad':
            openNotepad();
            break;
        default:
            if (command.startsWith('calculate ')) {
                try {
                    const expression = command.slice(10);
                    const result = eval(expression);
                    output.innerHTML += `Result: ${result}\n`;
                } catch (error) {
                    output.innerHTML += `-bash: ${command}: invalid expression\n`;
                }
            } else if (command.startsWith('osint_ip ')) {
                const ip = command.slice(8).trim();

                try {
                    const response = await fetch(`https://ipinfo.io/${ip}/json`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch IP information');
                    }
                    const data = await response.json();
                    
                    output.innerHTML += `\n🔍 Информация об IP-адресе ${ip}:\n`;
                    output.innerHTML += `🌐 IP: ${data.ip}\n`;
                    output.innerHTML += `🏙 Город: ${data.city}\n`;
                    output.innerHTML += `🌍 Регион: ${data.region}\n`;
                    output.innerHTML += `🌎 Страна: ${data.country}\n`;
                    output.innerHTML += `🏢 Организация: ${data.org}\n`; 
                    output.innerHTML += `📍 Координаты: ${data.loc}\n`;
                    output.innerHTML += `✉️ Почтовый индекс: ${data.postal}\n`;
                    output.innerHTML += `🕰 Часовой пояс: ${data.timezone}\n\n`;
                } catch (error) {
                    output.innerHTML += `-bash: ${command}: ${error.message}\n\n`;
                }
            } else {
                output.innerHTML += `-bash: ${command}: command not found\n\n`;
            }
            break;
    }
}

function showWelcomeMessage() {
    const output = document.getElementById('terminal-output');
    output.innerHTML += `Terminal 2.7.3 Beta\n\nFor more details use "help"\n\n`;
}

dragElement(document.getElementById("terminal-window"), document.getElementById("terminal-bar"));

function dragElement(element, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function focusTerminal() {
    document.getElementById('terminal-input').focus();
}

document.addEventListener('click', function(event) {
    const terminalWindow = document.getElementById('terminal-window');
    const terminalContent = document.getElementById('terminal-content');
    if (!terminalWindow.contains(event.target)) {
        document.getElementById('terminal-input').blur();
    } else {
        focusTerminal();
    }
});

function openNotepad() {
    const notepadWindow = document.getElementById('notepad-window');
    notepadWindow.style.display = 'block';
}

function closeNotepad() {
    const notepadWindow = document.getElementById('notepad-window');
    notepadWindow.style.display = 'none';
}

function exportNotepad() {
    const notepadContent = document.getElementById('notepad-content').value;
    const blob = new Blob([notepadContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'NotepadKiAtsushi.txt';
    link.click();
}
