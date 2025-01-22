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
    return fetch(`forms/${form}`)
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
}

const createAuthorForm = async function () {
    openModal();
    await chooseHTML('modal', '/create-author/create_author.html');
};

const createBookForm = async function () {
    openModal();
    await chooseHTML('modal', '/create-book/create_book.html');
};

const searchAuthorForm = async function () {
    openModal();
    await chooseHTML('modal', '/search-author/search_author.html');
};

const searchBookForm = async function () {
    openModal();
    await chooseHTML('modal', '/search-book/search_book.html');
};

const updateAuthorForm = async function () {
    openModal();
    await chooseHTML('modal', '/update-author/update_author.html');
};

const updateBookForm = async function () {
    openModal();
    await chooseHTML('modal', '/update-book/update_book.html');
};

const deleteAuthorForm = async function () {
    openModal();
    await chooseHTML('modal', '/delete-author/delete_author.html');
};

const deleteBookForm = async function () {
    openModal();
    await chooseHTML('modal','/delete-book/delete_book.html');
};

const authorData= function(){
    return {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        publication_date_first_book: document.getElementById('publication-date').value,
        awards: document.getElementById('awards').value,
        birth_date: document.getElementById('birth-date').value,
        death_date: document.getElementById('death-date').value,
    };
};

const bookData= function(){
    return {
        isbn: document.getElementById('isbn').value,
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        edition_date: document.getElementById('edition-date').value,
        num_pages: document.getElementById('page-count').value,
        total_copies: document.getElementById('copies').value,
        available_copies: document.getElementById('available-copies').value,
        synopsis: document.getElementById('synopsis').value,
        presentation_type: document.getElementById('presentation-type').value,
        literature_type: document.getElementById('literature-type').value
    };
};

function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
}

const showAuthor= function (data) {
    document.getElementById('name').value=data.author.name;
    document.getElementById('surname').value=data.author.surname;
    document.getElementById('publication-date').value=formatDate(data.author.publication_date_first_book);
    document.getElementById('awards').value=data.author.awards;
    document.getElementById('birth-date').value=formatDate(data.author.birth_date);
    document.getElementById('death-date').value=formatDate(data.author.death_date);
};

const searchAuthorResult = async function () {
    const nameInput = document.getElementById('name-search').value;
    try{
        const response = await fetch(`http://localhost:3000/api/author/${nameInput}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data= await response.json();

            document.getElementById('search-author-form').style.display = 'none';
            await chooseHTML('if-name-exists', '/show-author/show_author.html');
            showAuthor(data);
            document.getElementById('confirm-buttons').style.display = 'flex';
        } else {
            closeModal();
            alert('Author not found in database');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const showBook = function(data) {
    document.getElementById('isbn').value=data.book.isbn;
    document.getElementById('title').value=data.book.title;
    document.getElementById('author').value=data.book.author;
    document.getElementById('edition-date').value=formatDate(data.book.edition_date);
    document.getElementById('page-count').value=data.book.num_pages;
    document.getElementById('copies').value=data.book.total_copies;
    document.getElementById('available-copies').value=data.book.available_copies;
    document.getElementById('synopsis').value=data.book.synopsis;
    document.getElementById('presentation-type').value=data.book.presentation_type;
    document.getElementById('literature-type').value=data.book.literature_type;
};

const searchBookResult = async function () {
    const isbnInput = document.getElementById('isbn-search').value;
    try{
        const response = await fetch(`http://localhost:3000/api/book/${isbnInput}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data= await response.json();

            document.getElementById('search-book-form').style.display = 'none';
            await chooseHTML('if-isbn-exists', '/show-book/show_book.html');
            showBook(data);
            document.getElementById('confirm-buttons').style.display = 'flex';
        } else {
            closeModal();
            alert('Book not found in database');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const deleteAuthor= async function(name){
    try{
        const response = await fetch(`http://localhost:3000/api/deleteAuthor/${name}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            closeModal();
            alert('Author has been deleted.');
        } else {
            closeModal();
            alert('Author has not been deleted.');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const confirmDeleteAuthorForm = async function () {
    const nameInput = document.getElementById('name-delete').value;
    try{
        const response = await fetch(`http://localhost:3000/api/author/${nameInput}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data= await response.json();

            document.getElementById('delete-author-form').style.display = 'none';
            await chooseHTML('if-name-exists', '/show-author/show_author.html');
            showAuthor(data);
            document.getElementById('confirm-buttons').style.display = 'flex';
            document.getElementById('delete-author').addEventListener('click', ()=> {
                deleteAuthor(nameInput);
            });
        } else {
            closeModal();
            alert('Author not found in database');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const deleteBook= async function(isbn){
    try{
        const response = await fetch(`http://localhost:3000/api/deleteBook/${isbn}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            closeModal();
            alert('Book has been deleted.');
        } else {
            closeModal();
            alert('Book has not been deleted.');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const confirmDeleteBookForm = async function () {
    const isbnInput = document.getElementById('isbn-delete').value;
    try{
        const response = await fetch(`http://localhost:3000/api/book/${isbnInput}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data= await response.json();

            document.getElementById('delete-book-form').style.display = 'none';
            await chooseHTML('if-isbn-exists', '/show-book/show_book.html');
            showBook(data);
            document.getElementById('confirm-buttons').style.display = 'flex';
            document.getElementById('delete-book').addEventListener('click', ()=> {
                deleteBook(isbnInput);
            });
        } else {
            closeModal();
            alert('Book not found in database');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const updateAuthor= async function(name){
    const data= authorData();

    try{
        const response = await fetch(`http://localhost:3000/api/updateAuthor/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Data updated successfully');
            closeModal();
        } else {
            alert('Error in form fields');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const updateAuthorResult = async function () {
    const nameInput = document.getElementById('name-update').value;

    try{
        const response = await fetch(`http://localhost:3000/api/author/${nameInput}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data= await response.json();

            document.getElementById('update-author-form').style.display = 'none';
            await chooseHTML('if-name-exists', '/create-author/create_author.html');
            showAuthor(data);
            document.getElementById('create-author-h2').style.display = 'none';
            const createAuthorButton = document.getElementById('create-author-button');
            createAuthorButton.textContent = 'Update';
            createAuthorButton.className = 'update-button';

            document.getElementById('create-author-form').onsubmit = function(){
                updateAuthor(nameInput);
                return false;
            };
        } else {
            closeModal();
            alert('Author not found in database');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }

};

const updateBook= async function(isbn){
    const data= bookData();

    try{
        const response = await fetch(`http://localhost:3000/api/updateBook/${isbn}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Data updated successfully');
            closeModal();
        } else {
            alert('Error in form fields');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const updateBookResult = async function () {
    const isbnInput = document.getElementById('isbn-update').value;
    try{
        const response = await fetch(`http://localhost:3000/api/book/${isbnInput}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data= await response.json();

            document.getElementById('update-book-form').style.display = 'none';
            await chooseHTML('if-isbn-exists', '/create-book/create_book.html');
            showBook(data);
            document.getElementById('create-book-h2').style.display = 'none';
            const createBookButton = document.getElementById('create-book-button');
            createBookButton.textContent = 'Update';
            createBookButton.className = 'update-button';

            document.getElementById('create-book-form').onsubmit = function(){
                updateBook(isbnInput);
                return false;
            };
        } else {
            closeModal();
            alert('Book not found in database');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }

};

const saveAuthor= async function () {
    const data= authorData();

    try{
        const response = await fetch('http://localhost:3000/api/saveAuthor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Data sent successfully');
            closeModal();
        } else {
            alert('Error in form fields');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

const saveBook= async function () {
    const data= bookData();

    try{
        const response = await fetch('http://localhost:3000/api/saveBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Data sent successfully');
            closeModal();
        } else {
            alert('Error in form fields');
        }
    }catch(err){
        alert('Error connecting to server:'+ err);
    }
};

