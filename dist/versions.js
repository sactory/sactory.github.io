window.addEventListener("load", function(){var select = document.querySelector(".header select");var value = select.value;select.textContent = "";["0.143.0", "tour"].forEach(function(version){var option = document.createElement("option");option.value = option.textContent = version;select.appendChild(option);});select.value = value;select.addEventListener("change", function(){var version = "/v/" + this.value;var path = window.location.href.substr(window.location.origin.length);var match = path.match(/^\/v\/\d+\.\d+\.\d+\//);if(match) {path = version + "/" + path.substr(match[0].length);} else {path = version + path;}window.location.href = path;});});