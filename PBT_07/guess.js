document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    const secret = Math.floor(Math.random() * 100) + 1;
    const previous = new Set();
    const maxTurns = 7;
    let turns = 0;

    while (turns < maxTurns) {
        const input = prompt(`Lần ${turns + 1}/${maxTurns} — Nhập số (1-100):`);
        if (input === null) {
            alert("Bạn đã hủy trò chơi.");
            return;
        }
        const num = Number(input.trim());
        if (!Number.isInteger(num) || num < 1 || num > 100) {
            alert("Vui lòng nhập số nguyên từ 1 đến 100.");
            continue;
        }
        if (previous.has(num)) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }
        previous.add(num);
        turns++;

        if (num === secret) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${turns} lần!`);
            return;
        } else if (num < secret) {
            alert("Cao hơn");
        } else {
            alert("Thấp hơn");
        }
    }

    alert(`Hết lượt! Đáp án là ${secret}`);
}