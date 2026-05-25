(function() {
  var SIZES = [14, 16, 18, 20, 24, 28];
  var DEFAULT_IDX = 2; // 18px

  function getIdx() {
    var stored = parseInt(localStorage.getItem('cme-fontsize'), 10);
    if (!isNaN(stored) && stored >= 0 && stored < SIZES.length) return stored;
    return DEFAULT_IDX;
  }

  function applySize(idx) {
    document.documentElement.style.setProperty('--fs', SIZES[idx] + 'px');
    localStorage.setItem('cme-fontsize', idx);
  }

  // Apply immediately to avoid flash
  applySize(getIdx());

  function addFontButtons() {
    var navbar = document.getElementById('cme-navbar');
    if (!navbar) return;

    var btns = navbar.querySelector('.nav-btns');
    if (!btns) return;

    var idx = getIdx();

    var minusBtn = document.createElement('button');
    minusBtn.textContent = 'A−';
    minusBtn.title = 'Decrease font size';
    minusBtn.style.fontWeight = 'bold';

    var plusBtn = document.createElement('button');
    plusBtn.textContent = 'A+';
    plusBtn.title = 'Increase font size';
    plusBtn.style.fontWeight = 'bold';

    function update() {
      minusBtn.disabled = idx <= 0;
      plusBtn.disabled = idx >= SIZES.length - 1;
      applySize(idx);
    }

    minusBtn.onclick = function() { if (idx > 0) { idx--; update(); } };
    plusBtn.onclick = function() { if (idx < SIZES.length - 1) { idx++; update(); } };

    // Insert before the dark mode button (last button)
    btns.insertBefore(minusBtn, btns.firstChild);
    btns.insertBefore(plusBtn, btns.children[1]);
    update();
  }

  if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addFontButtons);
  } else {
    // Defer so the inline nav script's DOMContentLoaded callback
    // has already run and #cme-navbar exists in the DOM
    setTimeout(addFontButtons, 0);
  }
})();
