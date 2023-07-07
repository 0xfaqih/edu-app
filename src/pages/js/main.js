// main.js
fetch('components/navbar.html',)
  .then(response => response.text())
  .then(data => {
    const navbarContainer = document.getElementById('navbarContainer');
    navbarContainer.innerHTML = data;
  });

  fetch('components/toolbar.html')
  .then(response => response.text())
  .then(data => {
    const navbarContainer = document.getElementById('toolbarContainer');
    navbarContainer.innerHTML = data;
  });
  
  