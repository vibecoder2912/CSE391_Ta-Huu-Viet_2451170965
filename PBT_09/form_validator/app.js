const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const nameStatus = document.querySelector("#nameStatus");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordHint = document.querySelector("#passwordHint");
const strengthBar = document.querySelector("#strengthBar");
const confirmError = document.querySelector("#confirmError");
const phoneError = document.querySelector("#phoneError");
const submitBtn = document.querySelector("#submitBtn");

const modalOverlay = document.querySelector("#modalOverlay");
const modalBody = document.querySelector("#modalBody");
const closeModalBtn = document.querySelector("#closeModalBtn");

function validateName(value) {
    const trimmed = value.trim();
    const valid = trimmed.length >= 2 && trimmed.length <= 50;
    return {
        valid,
        message: valid ? "" : "Tên phải từ 2 đến 50 ký tự."
    };
}

function validateEmail(value) {
    const trimmed = value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailPattern.test(trimmed);
    return {
        valid,
        message: valid ? "" : "Email không hợp lệ. Ví dụ: name@example.com"
    };
}

function getPasswordStrength(value) {
    const hasLength = value.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[^a-zA-Z0-9]/.test(value);

    if (!hasLength) {
        return {
            level: "weak",
            valid: false,
            percent: 25,
            color: "var(--danger)",
            text: "Yếu: mật khẩu phải có ít nhất 8 ký tự."
        };
    }

    if (hasLetter && hasNumber && !(hasUpper && hasLower && hasSpecial)) {
        return {
            level: "medium",
            valid: true,
            percent: 65,
            color: "var(--warn)",
            text: "Trung bình: nên có thêm chữ hoa, chữ thường và ký tự đặc biệt."
        };
    }

    if (hasLength && hasUpper && hasLower && hasNumber && hasSpecial) {
        return {
            level: "strong",
            valid: true,
            percent: 100,
            color: "var(--success)",
            text: "Mạnh: mật khẩu đạt yêu cầu tốt."
        };
    }

    return {
        level: "medium",
        valid: true,
        percent: 65,
        color: "var(--warn)",
        text: "Trung bình: mật khẩu hợp lệ, nhưng chưa đủ mạnh."
    };
}

function formatPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const parts = [];

    if (digits.length > 0) parts.push(digits.slice(0, 4));
    if (digits.length > 4) parts.push(digits.slice(4, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 10));

    return parts.join("-");
}

function validatePhone(value) {
    const digits = value.replace(/\D/g, "");
    const valid = digits.length === 10;
    return {
        valid,
        message: valid ? "" : "Số điện thoại phải đủ 10 chữ số."
    };
}

function updateSubmitState() {
    const nameResult = validateName(nameInput.value);
    const emailResult = validateEmail(emailInput.value);
    const passwordResult = getPasswordStrength(passwordInput.value);
    const confirmResult = confirmPasswordInput.value === passwordInput.value && passwordInput.value.length > 0;
    const phoneResult = validatePhone(phoneInput.value);

    submitBtn.disabled = !(
        nameResult.valid &&
        emailResult.valid &&
        passwordResult.valid &&
        confirmResult &&
        phoneResult.valid
    );
}

nameInput.addEventListener("input", () => {
    const result = validateName(nameInput.value);
    nameError.textContent = result.message;
    nameStatus.textContent = result.valid ? "✅" : "❌";
    updateSubmitState();
});

emailInput.addEventListener("input", () => {
    const result = validateEmail(emailInput.value);
    emailError.textContent = result.message;
    updateSubmitState();
});

passwordInput.addEventListener("input", () => {
    const result = getPasswordStrength(passwordInput.value);
    strengthBar.style.width = result.percent + "%";
    strengthBar.style.background = result.color;
    passwordHint.textContent = result.text;

    const confirmMatch = confirmPasswordInput.value === passwordInput.value && passwordInput.value.length > 0;
    confirmError.textContent = confirmPasswordInput.value.length === 0
        ? ""
        : confirmMatch
            ? "Mật khẩu khớp."
            : "Mật khẩu không khớp.";

    updateSubmitState();
});

confirmPasswordInput.addEventListener("input", () => {
    const match = confirmPasswordInput.value === passwordInput.value && passwordInput.value.length > 0;
    confirmError.textContent = confirmPasswordInput.value.length === 0
        ? ""
        : match
            ? "Mật khẩu khớp."
            : "Mật khẩu không khớp.";
    updateSubmitState();
});

phoneInput.addEventListener("input", () => {
    const formatted = formatPhone(phoneInput.value);
    phoneInput.value = formatted;
    const result = validatePhone(formatted);
    phoneError.textContent = result.message;
    updateSubmitState();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (submitBtn.disabled) return;

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    modalBody.innerHTML = `
    <div><strong>Tên:</strong> ${data.name}</div>
    <div><strong>Email:</strong> ${data.email}</div>
    <div><strong>Phone:</strong> ${data.phone}</div>
  `;

    modalOverlay.hidden = false;
});

closeModalBtn.addEventListener("click", () => {
    modalOverlay.hidden = true;
});

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.hidden = true;
    }
});

updateSubmitState();