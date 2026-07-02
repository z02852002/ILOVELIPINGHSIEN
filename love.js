document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const title = document.getElementById('title');
    const message = document.getElementById('message');

    // 1. 「才不要」按鈕逃跑邏輯
    noBtn.addEventListener('mouseover', () => {
        // 限制在視窗內，留點安全邊距防止飛出螢幕
        const padding = 60;
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding * 2) + padding;
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding * 2) + padding;
        
        // 觸發逃跑，改用 fixed 確保能全螢幕亂飛
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });

    // 2. 「我願意」點擊成功彩蛋
    yesBtn.addEventListener('click', () => {
        title.innerHTML = "🎉 部署成功！本機端永久運行！ 🎉";
        message.innerHTML = "妳點了願意就不能 Rollback 囉！<br><br>現在，請轉頭看向那個正深情看著妳的工程師...<br>（把戒指拿出來吧！💍）";
        
        // 隱藏頑皮按鈕，放大願意按鈕並置中
        noBtn.style.display = 'none';
        yesBtn.style.transform = 'scale(1.3)';
        yesBtn.style.marginRight = '0';
        
        // 控制台驚喜
        console.log("%c She said YES! Target acquired. 🎉", "color: #ff69b4; font-size: 24px; font-weight: bold;");
    });
});