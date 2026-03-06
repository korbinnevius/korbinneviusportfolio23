(function () {

    const WEBM = '../videos/transition.webm';
    const MOV  = '../videos/transition.mov';

    const style = document.createElement('style');
    style.textContent = `
    #__vt {
      position: fixed; inset: 0;
      z-index: 99999;
      pointer-events: none;
      width: 100%; height: 100%;
    }
    #__vt video {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
    }
  `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.id = '__vt';
    wrap.innerHTML = `
    <video id="__vt-video" muted playsinline preload="auto">
      <source src="${WEBM}" type="video/webm">
      <source src="${MOV}"  type="video/quicktime">
    </video>
  `;

    function attach() {
        document.body.appendChild(wrap);
    }
    if (document.body) { attach(); }
    else { document.addEventListener('DOMContentLoaded', attach); }

    function playEnter() {
        const video = document.getElementById('__vt-video');
        if (!video) return;

        video.currentTime = 0;

        function doPlay() {
            const p = video.play();
            if (p && p.catch) p.catch(() => { wrap.style.display = 'none'; });
        }

        if (video.readyState >= 3) {
            doPlay();
        } else {
            video.addEventListener('canplay', doPlay, { once: true });
            setTimeout(() => { wrap.style.display = 'none'; }, 2000);
        }

        video.addEventListener('ended', () => {
            wrap.style.display = 'none';
        }, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', playEnter);
    } else {
        playEnter();
    }

    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            wrap.style.display = 'block';
            playEnter();
        }
    });

})();