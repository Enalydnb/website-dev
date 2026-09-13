(function() {
  const COOKIE_NAME = 'enaly_cookie_consent';

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }

  function injectStyles() {
    if (document.getElementById('cookie-banner-styles')) return;
    const style = document.createElement('style');
    style.id = 'cookie-banner-styles';
    style.innerHTML = `
      #cookie-banner-overlay {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 2rem);
        max-width: 500px;
        background: #0E0E10;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        padding: 1.25rem;
        z-index: 999999;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9);
        font-family: 'Manrope', sans-serif;
        color: #F2F2F2;
        box-sizing: border-box;
      }
      #cookie-banner-overlay strong {
        color: #FF006E;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: block;
        margin-bottom: 0.4rem;
      }
      #cookie-banner-overlay p {
        font-size: 0.82rem;
        line-height: 1.45;
        color: #aaaaaa;
        margin: 0 0 1rem 0;
      }
      #cookie-banner-overlay a {
        color: #FF006E;
        text-decoration: underline;
      }
      .cookie-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.6rem;
      }
      .cookie-btn {
        font-family: 'League Gothic', sans-serif;
        font-size: 1.25rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        text-align: center;
        transition: all 0.2s ease;
      }
      .cookie-btn-accept {
        background: #FF006E;
        color: #ffffff;
      }
      .cookie-btn-accept:hover {
        background: #d4005b;
      }
      .cookie-btn-decline {
        background: rgba(255, 255, 255, 0.05);
        color: #cccccc;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .cookie-btn-decline:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      @media (max-width: 480px) {
        #cookie-banner-overlay {
          bottom: 0.5rem;
          width: calc(100% - 1.2rem);
          padding: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function showBanner() {
    injectStyles();
    if (document.getElementById('cookie-banner-overlay')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner-overlay';
    banner.innerHTML = `
      <div>
        <strong>DATENSCHUTZ & COOKIES</strong>
        <p>Wir nutzen technisch notwendige Cookies, um die Funktion der Website zu gewährleisten. Weitere Infos findest du in der <a href="datenschutz">Datenschutzerklärung</a>.</p>
      </div>
      <div class="cookie-buttons">
        <button class="cookie-btn cookie-btn-decline" id="cookieDecline">Ablehnen</button>
        <button class="cookie-btn cookie-btn-accept" id="cookieAccept">Akzeptieren</button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function() {
      setCookie(COOKIE_NAME, 'accepted', 365);
      banner.remove();
    });

    document.getElementById('cookieDecline').addEventListener('click', function() {
      setCookie(COOKIE_NAME, 'declined', 365);
      banner.remove();
    });
  }

  window.reopenCookieBanner = function() {
    showBanner();
  };

  document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      showBanner();
    }
  });
})();