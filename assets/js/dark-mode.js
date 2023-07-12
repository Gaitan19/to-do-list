var switchMode = document.querySelector(".switch-mode");
let mode = localStorage.getItem("mode") || "light";

switchMode.checked = mode === "dark";
ChannelMergerNodeMode();

switchMode.addEventListener("change", () => {
    if (switchMode.checked) {
        mode = "dark";
    } else {
        mode = "light";
    }
    ChannelMergerNodeMode();
    saveMode();
});

function ChannelMergerNodeMode() {
    if (mode == "light") {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.querySelector(".switch-mode-icon").classList.remove("fa-sun");
    document.querySelector(".switch-mode-icon").classList.add("fa-moon");
    document.querySelector(".To-do-list").classList.add("dark-mode");
    document.querySelector(".To-do-list-container").classList.add("dark-mode-container");
    document.querySelector(".To-do-list-container-text").classList.add("dark-mode-container-text");

    const darkModeEditText = document.querySelectorAll(".To-do-list-input-edit");
    darkModeEditText.forEach((item) => {
        item.classList.add("dark-mode-text");
    });

    const darkModeGray = document.querySelectorAll(".To-do-list-group-gray");
    darkModeGray.forEach((item) => {
        item.classList.add("dark-mode-group-gray");
    });

    const darkModeWhi = document.querySelectorAll(".To-do-list-group-white");
    darkModeWhi.forEach((item) => {
        item.classList.add("dark-mode-group-white");
    });

    const darkModeText = document.querySelectorAll(".To-do-list-text");
    darkModeText.forEach((item) => {
        item.classList.add("dark-mode-text");
    });

    const darkModeBtn = document.querySelectorAll(".btn-success");
    darkModeBtn.forEach((item) => {
        item.classList.add("dark-mode-btn");
    });

    const darkModeCheck = document.querySelectorAll(".To-do-list-check");
    darkModeCheck.forEach((item) => {
        item.classList.add("dark-mode-checkBox");
    });
}

function enableLightMode() {
    
    document.querySelector(".switch-mode-icon").classList.remove("fa-moon");
    document.querySelector(".switch-mode-icon").classList.add("fa-sun");
    document.querySelector(".To-do-list").classList.remove("dark-mode");
    document.querySelector(".To-do-list-container").classList.remove("dark-mode-container");
    document.querySelector(".To-do-list-container-text").classList.remove("dark-mode-container-text");

    const darkModeGray = document.querySelectorAll(".dark-mode-group-gray");
    darkModeGray.forEach((item) => {
        item.classList.remove("dark-mode-group-gray");
    });

    const darkModeWhi = document.querySelectorAll(".dark-mode-group-white");
    darkModeWhi.forEach((item) => {
        item.classList.remove("dark-mode-group-white");
    });

    const darkModeText = document.querySelectorAll(".To-do-list-text");
    darkModeText.forEach((item) => {
        item.classList.remove("dark-mode-text");
    });

    const darkModeBtn = document.querySelectorAll(".btn-success");
    darkModeBtn.forEach((item) => {
        item.classList.remove("dark-mode-btn");
    });

    const darkModeCheck = document.querySelectorAll(".To-do-list-check");
    darkModeCheck.forEach((item) => {
        item.classList.remove("dark-mode-checkBox");
    });

    const darkModeEditText = document.querySelectorAll(".To-do-list-input-edit");
    darkModeEditText.forEach((item) => {
        item.classList.remove("dark-mode-text");
    });
}

function saveMode() {
    localStorage.setItem("mode", mode);
}

document.addEventListener("load", ChannelMergerNodeMode);
