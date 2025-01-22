const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.getElementById('modal').innerHTML = ' ';
};

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
})

function chooseHTML(id,form) {
    fetch(`forms/${form}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load form');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const createAuthorForm = function () {
    openModal();
    chooseHTML('modal','/create-author/create_author.html');
};

const createBookForm = function () {
    openModal();
    chooseHTML('modal','/create-book/create_book.html');
};

const searchAuthorForm = function () {
    openModal();
    chooseHTML('modal','/search-author/search_author.html');
};

const searchBookForm = function () {
    openModal();
    chooseHTML('modal','/search-book/search_book.html');
};

const updateAuthorForm = function () {
    openModal();
    chooseHTML('modal','/update-author/update_author.html');
};

const updateBookForm = function () {
    openModal();
    chooseHTML('modal','/update-book/update_book.html');
};

const deleteAuthorForm = function () {
    openModal();
    chooseHTML('modal','/delete-author/delete_author.html');

};

const deleteBookForm = function () {
    openModal();
    chooseHTML('modal','/delete-book/delete_book.html');
};

const searchAuthorResult = function () {
    const nameInput = document.getElementById('name');
    if (true){
        const searchForm = document.getElementById('search-author-form');
        searchForm.style.display = 'none';
        chooseHTML('if-name-exists','/show-author/show_author.html');
        const confirmDeleteButtons= document.getElementById('confirm-buttons');
        confirmDeleteButtons.style.display = 'flex';
    }
};

const searchBookResult = function () {
    const isbnInput = document.getElementById('isbn');
    if (true){
        const searchForm = document.getElementById('search-book-form');
        searchForm.style.display = 'none';
        chooseHTML('if-isbn-exists','/show-book/show_book.html');
        const confirmDeleteButtons= document.getElementById('confirm-buttons');
        confirmDeleteButtons.style.display = 'flex';
    }
};

const confirmDeleteAuthorForm = function () {
    const nameInput = document.getElementById('name');
    if (true){
        const deleteForm = document.getElementById('delete-author-form');
        deleteForm.style.display = 'none';
        chooseHTML('if-name-exists','/show-author/show_author.html');
        const confirmDeleteButtons= document.getElementById('confirm-buttons');
        confirmDeleteButtons.style.display = 'flex';
    }
};

const confirmDeleteBookForm = function () {
    const isbnInput = document.getElementById('isbn');
    if (true){
        const deleteForm = document.getElementById('delete-book-form');
        deleteForm.style.display = 'none';
        chooseHTML('if-isbn-exists','/show-book/show_book.html');
        const confirmDeleteButtons= document.getElementById('confirm-buttons');
        confirmDeleteButtons.style.display = 'flex';
    }
};

const updateAuthorResult = function () {
    const nameInput = document.getElementById('name');
    if (true){
        const searchForm = document.getElementById('update-author-form');
        searchForm.style.display = 'none';
        chooseHTML('if-name-exists','/create-author/create_author.html');
        const createAuthorH2 = document.getElementById('create-author-h2');
        const createAuthorButton = document.getElementById('create-author-button');
    }
};

const updateBookResult = function () {
    const isbnInput = document.getElementById('isbn');
    if (true){
        const searchForm = document.getElementById('update-book-form');
        searchForm.style.display = 'none';
        chooseHTML('if-isbn-exists','/create-book/create_book.html');
        const createBookH2 = document.getElementById('create-book-h2');
        const createBookButton = document.getElementById('create-book-button');
    }
};

