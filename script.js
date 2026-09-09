(function () {
  var hm = document.getElementById('hm'),
    sec = document.getElementById('sec'),
    dateEl = document.getElementById('date');
    
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var d = new Date();
    hm.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    sec.textContent = pad(d.getSeconds());
    var wd = '日一二三四五六'.charAt(d.getDay());
    dateEl.textContent = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 · 星期' + wd;
  }
  tick(); setInterval(tick, 1000);

  var engines = {
    bing: function (q) { return 'https://www.bing.com/search?q=' + q; },
    google: function (q) { return 'https://www.google.com/search?q=' + q; },
    ddg: function (q) { return 'https://duckduckgo.com/?q=' + q; }
  };

  var names = { bing: 'Bing', google: 'Google', ddg: 'DuckDuckGo' };
  var icons = {
    bing: 'assets/engine_icon/bing.svg',
    google: 'assets/engine_icon/google.svg',
    ddg: 'assets/engine_icon/ddg.svg'
  };
  var eng = document.getElementById('eng'),
    engBtn = document.getElementById('engBtn'),
    engName = document.getElementById('engName'),
    engIcon = document.getElementById('engIcon'),
    cur = 'bing';
  try { cur = localStorage.getItem('sp-engine') || 'bing'; } catch (e) { }

  function syncEng() {
    engName.textContent = names[cur];
    if (engIcon) {
      engIcon.src = icons[cur];
      engIcon.alt = names[cur];
    }
    var opts = eng.querySelectorAll('[data-v]');
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.toggle('cur', opts[i].getAttribute('data-v') === cur);
    }
  }
  syncEng();

  engBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = eng.classList.toggle('open');
    engBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  var opts = eng.querySelectorAll('[data-v]');

  for (var i = 0; i < opts.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        cur = btn.getAttribute('data-v');
        try { localStorage.setItem('sp-engine', cur); } catch (err) { }
        syncEng();
        eng.classList.remove('open');
        engBtn.setAttribute('aria-expanded', 'false');
        document.getElementById('q').focus();
      });
    })(opts[i]);
  }

  document.addEventListener('click', function () {
    eng.classList.remove('open');
    engBtn.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      eng.classList.remove('open');
      engBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('f').addEventListener('submit', function (e) {
    e.preventDefault();
    var q = document.getElementById('q').value.trim();
    if (q) window.location.href = engines[cur](encodeURIComponent(q));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== document.getElementById('q')) {
      e.preventDefault();
      document.getElementById('q').focus();
    }
  });

  var qt = document.getElementById('qt'),
    qf = document.getElementById('qf'),
    quote = document.getElementById('quote');

  var fallback = [
    ['路漫漫其修远兮，吾将上下而求索。', '屈原'],
    ['海内存知己，天涯若比邻。', '王勃'],
    ['天生我材必有用，千金散尽还复来。', '李白'],
    ['会当凌绝顶，一览众山小。', '杜甫'],
    ['纸上得来终觉浅，绝知此事要躬行。', '陆游'],
    ['长风破浪会有时，直挂云帆济沧海。', '李白'],
    ['欲穷千里目，更上一层楼。', '王之涣'],
    ['山重水复疑无路，柳暗花明又一村。', '陆游']
  ];

  var off = Math.floor(Math.random() * fallback.length);

  function render(t, f) {
    qt.textContent = t;
    qf.textContent = f ? '—— ' + f : '';
  }

  function fetchOne() {
    fetch('https://v1.hitokoto.cn')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var from = (d.from_who ? d.from_who + ' ' : '') + (d.from ? '《' + d.from + '》' : '');
        render(d.hitokoto, from.trim());
      })
      .catch(function () {
        off = (off + 1) % fallback.length;
        render(fallback[off][0], fallback[off][1]);
      });
  }
  fetchOne();

  quote.addEventListener('click', function () {
    quote.classList.add('fading');
    setTimeout(function () { fetchOne(); quote.classList.remove('fading'); }, 180);
  });
})();
