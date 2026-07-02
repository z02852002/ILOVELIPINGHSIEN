document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const container = document.querySelector('.proposal-container');
  const title = document.getElementById('title');
  const message = document.getElementById('message');

  let isFixed = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let rafId = null;
  let lastTrigger = 0;
  const COOLDOWN = 200;
  const STEP_SPEED = 6;

  function getBounds() {
    const rect = container.getBoundingClientRect();
    const padding = 16;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    return {
      minX: rect.left + padding,
      maxX: rect.right - btnWidth - padding,
      minY: rect.top + padding,
      maxY: rect.bottom - btnHeight - padding
    };
  }

  function clampToBounds(x, y) {
    const b = getBounds();
    const safeMaxX = Math.max(b.minX, b.maxX);
    const safeMaxY = Math.max(b.minY, b.maxY);
    return {
      x: Math.min(Math.max(x, b.minX), safeMaxX),
      y: Math.min(Math.max(y, b.minY), safeMaxY)
    };
  }

  function step() {
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < STEP_SPEED) {
      currentX = targetX;
      currentY = targetY;
    } else {
      currentX += (dx / dist) * STEP_SPEED;
      currentY += (dy / dist) * STEP_SPEED;
    }

    noBtn.style.left = `${currentX}px`;
    noBtn.style.top = `${currentY}px`;

    if (dist >= 0.5) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  }

  function runAway() {
    const now = Date.now();
    if (now - lastTrigger < COOLDOWN) return;
    lastTrigger = now;

    if (!isFixed) {
      const rect = noBtn.getBoundingClientRect();
      currentX = rect.left;
      currentY = rect.top;
      targetX = currentX;
      targetY = currentY;

      noBtn.style.right = 'auto';
      noBtn.style.left = `${currentX}px`;
      noBtn.style.top = `${currentY}px`;
      noBtn.style.position = 'fixed';
      noBtn.style.margin = '0';
      isFixed = true;
    }

    const moveDistance = 70;
    const randomAngle = Math.random() * 2 * Math.PI;
    const rawX = targetX + Math.cos(randomAngle) * moveDistance;
    const rawY = targetY + Math.sin(randomAngle) * moveDistance;

    const clamped = clampToBounds(rawX, rawY);
    targetX = clamped.x;
    targetY = clamped.y;

    if (rafId === null) {
      rafId = requestAnimationFrame(step);
    }
  }

  window.addEventListener('resize', () => {
    if (!isFixed) return;
    const clamped = clampToBounds(currentX, currentY);
    currentX = clamped.x;
    currentY = clamped.y;
    targetX = clamped.x;
    targetY = clamped.y;
    noBtn.style.left = `${currentX}px`;
    noBtn.style.top = `${currentY}px`;
  });

  noBtn.addEventListener('mouseover', runAway);

  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    runAway();
  }, { passive: false });

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    runAway();
  });

  yesBtn.addEventListener('click', () => {
    if (rafId) cancelAnimationFrame(rafId);

    title.innerHTML = "🎉 部署成功！本機端永久運行！ 🎉";
    message.innerHTML = "妳點了願意就不能 Rollback 囉！現在，妳就是我的!";

    noBtn.style.display = 'none';

    yesBtn.style.position = 'fixed';
    yesBtn.style.left = '50vw';
    yesBtn.style.top = 'calc(50vh + 100px)';
    yesBtn.style.transform = 'translate(-50%, -50%) scale(1.3)';

    console.log("%c She said YES! Target acquired. 🎉", "color: #ff69b4; font-size: 24px; font-weight: bold;");
  });
});
