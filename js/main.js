const url = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture';
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('.modal__close');
const modalBody = modal.querySelector('.modal__body');
const sortSelect = document.querySelector('.sort-select');
let sortDirection = sortSelect.value;

const openModal = () => {
    modal.classList.add('show');
    modal.style.display = 'block';
}

const closeModal = () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
}

closeButton.addEventListener('click', () => closeModal());

const renderList = (arr) => {
    const users =  _.orderBy(arr, ['name.first', 'name.last'], [sortDirection, sortDirection]);
    const oldList = document.querySelector('.users__list');
    const newList = document.createElement('ul');
    newList.classList.add('users__list');
    users.forEach((user) => {
        const li = document.createElement('li');
        const userItemTemplate = 
            `<img class="user__image" src="${user.picture.medium}">
            <div>
                <p class="user__title-name">${user.name.title}.</p>
                <p class="user__name">${user.name.first} ${user.name.last}</p>
            </div>`;
        li.innerHTML = userItemTemplate;
        li.addEventListener('click', () => renderModal(user));
        newList.appendChild(li);
    });
    oldList.replaceWith(newList);
};

const renderModal = (obj) => {
    const userModalHtml = 
    `<div class="user-info">
        <img class="user-info__img" src="${obj.picture.large}" width="128" height="128" alt="user image">
        <div class="user-info__full">
            <h2 class="user-info__name">${obj.name.first} ${obj.name.last}</h2>
            <address class="user-info__address">${obj.location.street}, ${obj.location.city}, ${obj.location.state}, ${obj.location.postcode}</address>
            <p>
                <a href="tel:${obj.phone.match(/\d/g).join('')}">${obj.phone}</a>
            </p>
            <p>
                <a href="mailto:${obj.email}">${obj.email}</a>
            </p>
        </div>
    </div>`;
    modalBody.innerHTML = userModalHtml;
    openModal();
};

const request = async () => {
    const response = await fetch(url);
    const data = await response.json();
    renderList(data.results);
    sortSelect.addEventListener('change', (e) => {
        sortDirection = e.currentTarget.value;
        renderList(data.results, sortDirection);
    });
};

request();