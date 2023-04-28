const form = document.forms[0];
const login = form[0];
const password = form[1];
const email = form[2];
const displayRoot = document.querySelector('.display-root');
let users = [];
let id;
const input = {
    login: form[0],
    password: form[1],
    email: form[2]
};
let loginV = /^[a-z]{4,16}$/i;
let passwordV = /^[a-z|0-9|\.|_|-]{4,16}$/;
let emailV = /^.\S+@[a-z]+\.[a-z]+$/i;
function getTable(id, login, password, email) {
    return `
            <div class="display_table" data-id="${id}">
                <div>${id}</div>
                <div class="login">${login}</div>
                <div class="password">${password}</div>
                <div class="email">${email}</div>
                <div class="edit-btn">Edit</div>
                <div class="delete-btn">Delete</div>
            </div>
    `;
}
function render() {
    displayRoot.innerHTML = '';
    users.forEach((user, i) => {
        displayRoot.insertAdjacentHTML('beforeend', getTable(i + 1, user.l, user.p, user.e));
    });
}
function addUser() {
    let testLogin = loginV.test(form[0].value);
    let testPassword = passwordV.test(form[1].value);
    let testEmail = emailV.test(form[2].value);
    if (testLogin && testPassword && testEmail) {
        let l, p, e;
        l = input.login.value;
        p = input.password.value;
        e = input.email.value;
        users.push({ l, p, e });
        render();
        form.reset();
        input.login.style.border = '3px solid lightgray';
        input.password.style.border = '3px solid lightgray';
        input.email.style.border = '3px solid lightgray';
    }
}
input.login.addEventListener('input', function () {
    if (loginV.test(this.value)) {
        this.style.border = '1px solid green';
    }
    else {
        this.style.border = '1px solid red';
    }
});
input.password.addEventListener('input', function () {
    if (passwordV.test(this.value)) {
        this.style.border = '1px solid green';
    }
    else {
        this.style.border = '1px solid red';
    }
});
input.email.addEventListener('input', function () {
    if (emailV.test(this.value)) {
        this.style.border = '1px solid green';
    }
    else {
        this.style.border = '1px solid red';
    }
});
displayRoot.addEventListener('click', function () {
    if (event.target.className === 'delete-btn') {
        users.splice(event.target.parentElement.dataset.id - 1, 1);
        render();
    }
    else if (event.target.className === 'edit-btn') {
        document.querySelector('.add_btn').classList.add('hide');
        document.querySelector('.edit_btn').classList.remove('hide');
        id = event.target.parentElement.dataset.id - 1;
        input.login.value = users[id].l;
        input.password.value = users[id].p;
        input.email.value = users[id].e;
    }
});
document.querySelector('.edit_btn').addEventListener('click', function () {
    let testLogin = loginV.test(form[0].value);
    let testPassword = passwordV.test(form[1].value);
    let testEmail = emailV.test(form[2].value);
    if (testLogin && testPassword && testEmail) {
        users[id].l = input.login.value;
        users[id].p = input.password.value;
        users[id].e = input.email.value;
        id = null;
        render();
        document.querySelector('.add_btn').classList.remove('hide');
        document.querySelector('.edit_btn').classList.add('hide');
        form.reset();
        input.login.style.border = '3px solid lightgray';
        input.password.style.border = '3px solid lightgray';
        input.email.style.border = '3px solid lightgray';
    }
});
