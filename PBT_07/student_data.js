const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function avgScore(s) {
    return +(s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(1); // Tính điểm trung bình theo công thức và làm tròn 1 chữ số thập phân
}

function classify(avg) {
    if (avg >= 8.0) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5.0) return "Trung bình";
    return "Yếu";
}

function processStudents(list) { // Hàm xử lý danh sách sinh viên và trả về kết quả bao gồm: danh sách kết quả, số lượng từng loại, sinh viên có điểm cao nhất và thấp nhất, điểm trung bình của lớp và theo giới tính
    const results = [];
    const counts = { Giỏi: 0, Khá: 0, "Trung bình": 0, Yếu: 0 };
    let max = null, min = null;
    const totals = { math: 0, physics: 0, cs: 0 };

    for (let i = 0; i < list.length; i++) {
        const s = list[i];
        const tb = avgScore(s);
        const xl = classify(tb);
        results.push({ stt: i + 1, name: s.name, tb, xl });
        counts[xl]++; // Đếm số lượng sinh viên theo từng loại xếp hạng
        totals.math += s.math;
        totals.physics += s.physics;
        totals.cs += s.cs;
        if (!max || tb > max.tb) max = { ...s, tb }; // Cập nhật sinh viên có điểm cao nhất nếu chưa có hoặc nếu điểm trung bình của sinh viên hiện tại cao hơn
        if (!min || tb < min.tb) min = { ...s, tb }; // Cập nhật sinh viên có điểm thấp nhất nếu chưa có hoặc nếu điểm trung bình của sinh viên hiện tại thấp hơn
    }

    const classAvg = {
        math: +(totals.math / list.length).toFixed(2), // Tính điểm trung bình của lớp cho từng môn và làm tròn 2 chữ số thập phân
        physics: +(totals.physics / list.length).toFixed(2),
        cs: +(totals.cs / list.length).toFixed(2),
    };

    const gender = {};
    for (const s of list) {
        if (!gender[s.gender]) gender[s.gender] = { count: 0, totalTb: 0 }; // Khởi tạo đối tượng cho giới tính nếu chưa tồn tại
        const tb = avgScore(s);
        gender[s.gender].count++;
        gender[s.gender].totalTb += tb;// Cộng dồn điểm trung bình cho giới tính tương ứng và đếm số lượng sinh viên theo giới tính
    }
    const genderAvg = {};
    for (const g in gender) genderAvg[g] = +(gender[g].totalTb / gender[g].count).toFixed(2); // Tính điểm trung bình theo giới tính và làm tròn 2 chữ số thập phân

    return { results, counts, max, min, classAvg, genderAvg };
}

const report = processStudents(students);

// In ra kết quả
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (const r of report.results) {
    console.log(`| ${r.stt.toString().padEnd(3)} | ${r.name.padEnd(6)} | ${r.tb.toString().padEnd(4)} | ${r.xl.padEnd(11)} |`);
}
console.log("\nSố sinh viên:", report.counts);
console.log("Sinh viên có điểm cao nhất:", report.max.name, report.max.tb);
console.log("Sinh viên có điểm thấp nhất:", report.min.name, report.min.tb);
console.log("Điểm trung bình của lớp:", report.classAvg);
console.log("Điểm trung bình theo giới tính:", report.genderAvg);