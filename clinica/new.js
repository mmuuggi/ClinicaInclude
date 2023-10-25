document.addEventListener('DOMContentLoaded', function () {
    const paragrafoName = document.getElementById('name');
    const name = localStorage.getItem('role');
    if (paragrafoName && name) {   
        paragrafoName.textContent = name;
    }
});