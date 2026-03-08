/* =============================================
   Pebble Inc. - JavaScript
   =============================================

   【JavaScriptの読み方ガイド】
   - document.querySelector → HTMLの要素を探す
   - addEventListener → 「〇〇が起きたら△△する」を登録
   - classList.add/remove → CSSのクラスを付けたり外したりする
   ============================================= */

// ===== ページが読み込まれたら実行 =====
document.addEventListener('DOMContentLoaded', () => {

  // ----- ナビゲーション：スクロールで背景をつける -----
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ----- ハンバーガーメニュー（スマホ用） -----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // メニューのリンクをクリックしたら閉じる
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ----- 数字カウントアップアニメーション -----
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // 2秒かけて数える
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // イージング（最初は速く、最後はゆっくり）
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  // 数字が画面に入ったらカウント開始
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  // ----- スクロールアニメーション（ふわっと表示） -----
  // アニメーション対象の要素を指定
  const animateTargets = document.querySelectorAll(
    '.value-card, .service-card, .work-card, .founder-card, .section-header, .about-text, .contact-form'
  );

  // 各要素に fade-in クラスを追加
  animateTargets.forEach(el => el.classList.add('fade-in'));

  // 画面に入ったら visible クラスを追加してアニメーション発動
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 少しずらして表示（カードが順番に出てくる効果）
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // カード系の要素に遅延を設定
  document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
    card.dataset.delay = i * 100;
  });
  document.querySelectorAll('.founder-card').forEach((card, i) => {
    card.dataset.delay = i * 100;
  });
  document.querySelectorAll('.about-values .value-card').forEach((card, i) => {
    card.dataset.delay = i * 100;
  });

  animateTargets.forEach(el => fadeObserver.observe(el));

  // ----- お問い合わせフォーム -----
  // Formspreeが送信処理を行うのでJSでの処理は不要
  // 送信後はFormspreeの完了ページが表示される

});
