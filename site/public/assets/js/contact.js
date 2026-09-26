// CONTACT: 依頼種別の切り替え、入力チェック、送信、FAQ の開閉
(() => {
  const form = document.querySelector('[data-contact-form]');
  const done = document.querySelector('[data-done]');
  if (!form || !done) return;

  const typeInput = form.querySelector('input[name="type"]');
  const typeBtns = [...form.querySelectorAll('[data-type]')];
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = form.querySelector('[data-submit-label]');

  typeBtns.forEach(btn => btn.addEventListener('click', () => {
    typeBtns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    typeInput.value = btn.dataset.type;
  }));

  const rules = {
    name: v => v.trim() ? '' : '※ お名前を入力してください',
    email: v => !v.trim() ? '※ メールアドレスを入力してください'
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : '※ メールアドレスの形式が正しくありません',
    message: v => v.trim() ? '' : '※ お問い合わせ内容を入力してください',
    agree: (_, el) => el.checked ? '' : '※ プライバシーポリシーへの同意が必要です'
  };

  const setError = (name, msg) => {
    const el = form.elements[name];
    const err = document.getElementById(`err-${name}`);
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    if (err) err.textContent = msg;
  };

  // 入力し直したらその項目のエラーを消す
  Object.keys(rules).forEach(name => {
    const el = form.elements[name];
    el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => setError(name, ''));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let firstInvalid = null;
    Object.entries(rules).forEach(([name, check]) => {
      const el = form.elements[name];
      const msg = check(el.value, el);
      setError(name, msg);
      if (msg && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    submitBtn.disabled = true;
    submitLabel.textContent = '送信中…';
    // TODO: 送信先（API・フォームサービス）が決まったら差し替える。今は送信を模擬している。
    setTimeout(() => {
      form.hidden = true;
      done.hidden = false;
      done.focus();
      submitBtn.disabled = false;
      submitLabel.textContent = '送信する';
    }, 1200);
  });

  done.querySelector('[data-reset]').addEventListener('click', () => {
    form.reset();
    typeBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === 0)));
    typeInput.value = typeBtns[0].dataset.type;
    done.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();

(() => {
  // FAQ: 一度に開くのは1項目だけ
  const root = document.querySelector('[data-faq]');
  if (!root) return;
  const btns = [...root.querySelectorAll('.faq__q')];
  const setOpen = (btn, open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.faq__icon').textContent = open ? '−' : '+';
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  };
  btns.forEach(btn => btn.addEventListener('click', () => {
    const willOpen = btn.getAttribute('aria-expanded') !== 'true';
    btns.forEach(b => setOpen(b, b === btn && willOpen));
  }));
})();
