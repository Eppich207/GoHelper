function toggleOverlay() {
    // This will be executed in the context of the active tab
    const overlay = document.getElementById('myOverlay');
    if (overlay) {
      overlay.remove();
    } else {
      const div = document.createElement('div');
      div.id = 'myOverlay';
      div.textContent = '2 Minutes Timer Started!';
      div.style.position = 'fixed';
      div.style.top = '0';
      div.style.left = '0';
      div.style.background = 'rgba(100,100,0,0.5)';
      div.style.color = 'white';
      div.style.padding = '100px';
      document.body.appendChild(div);
    }
  }
  