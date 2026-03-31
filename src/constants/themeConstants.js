const initTheme = () => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
};

const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
};

initTheme();

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-btn");
    if (btn) btn.addEventListener("click", toggleTheme);
});