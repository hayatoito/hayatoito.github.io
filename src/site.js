function detectColorTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function enableLightTheme() {
  document.documentElement.classList.remove("dark-theme");
  lightButton.classList.add("disabled");
  darkButton.classList.remove("disabled");
}

function enableDarkTheme() {
  document.documentElement.classList.add("dark-theme");
  lightButton.classList.remove("disabled");
  darkButton.classList.add("disabled");
}

var lightButton;
var darkButton;

function initColorTheme() {
  lightButton = document.querySelector("#theme-light");
  darkButton = document.querySelector("#theme-dark");

  if (detectColorTheme() === "light") {
    enableLightTheme();
  } else {
    enableDarkTheme();
  }

  lightButton.addEventListener("click", _e => {
    localStorage.setItem("theme", "light");
    enableLightTheme();
  });

  darkButton.addEventListener("click", _e => {
    localStorage.setItem("theme", "dark");
    enableDarkTheme();
  });
}

window.addEventListener("DOMContentLoaded", initColorTheme);
