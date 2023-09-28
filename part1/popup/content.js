
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleOverlay") {
      const overlay = document.getElementById('myOverlay');
      if (overlay) {
        overlay.remove();
      } else {
        const div = document.createElement('div');
        div.id = 'myOverlay';
        div.textContent = 'Overlay Text';
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.background = 'rgba(50,100,0,0.5)';
        div.style.color = 'white';
        div.style.padding = '100px';
        document.body.appendChild(div);
      }
    }
  });