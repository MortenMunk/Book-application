let myLibrary = [];

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(author, title, pages, isRead) {
  const book = new Book(author, title, pages, isRead);
  myLibrary.push(book);
}

function formValidate() {
  //Selecting the forms
  const form = document.querySelector('#form');
  const authorInput = document.querySelector('#author');
  const titleInput = document.querySelector('#title');
  const pageInput = document.querySelector('#pages');
  const isReadInput = document.querySelector('#isRead');
  if(authorInput.value !='' && titleInput.value !='' && pageInput.value > 0) {
    if (isReadInput === isReadInput.checked) {
      addBookToLibrary(authorInput.value, titleInput.value, pageInput.value, true);
    } else {
      addBookToLibrary(authorInput.value, titleInput.value, pageInput.value, false);
    }
  } 
  form.reset();
  populateTable();
}

function populateTable() {
  const bookTable = document.querySelector('#book-table');
  bookTable.textContent = '';
  for(let i = 0; i < myLibrary.length; i++) {
    const tableRow = document.createElement('tr');
    bookTable.appendChild(tableRow);
    
    //Print the author
    const tableAuthor = document.createElement('td');
    tableAuthor.textContent = myLibrary[i].author;
    tableRow.appendChild(tableAuthor);
    
    //Print the title
    const tableTitle = document.createElement('td');
    tableTitle.textContent = myLibrary[i].title;
    tableRow.appendChild(tableTitle);
    
    //Print the page number
    const tablePages = document.createElement('td');
    tablePages.textContent = myLibrary[i].pages;
    tableRow.appendChild(tablePages);
    
    //Print the reading status
    const isReadSymbol = document.createElement('td');
    if(myLibrary[i].isRead) {
      isReadSymbol.textContent = 'READ';
    } else {
      isReadSymbol.textContent = 'UNREAD';
    }
    tableRow.appendChild(isReadSymbol);

    //Add delete button with functionality
    const deleteBtn = document.createElement('td');
    deleteBtn.innerHTML = '<button>Delete</button>';
    deleteBtn.setAttribute('index', `${i}`);
    tableRow.appendChild(deleteBtn);
    document.querySelector(`[index="${i}"]`).addEventListener("click", function() {
      myLibrary.splice(i, 1);
      populateTable();
    });

    //Add change status button with functionality
    const updateStatusBtn = document.createElement('td');
    updateStatusBtn.innerHTML = '<button>Change read status</button>';
    updateStatusBtn.setAttribute('status-index', `${i}`);
    tableRow.appendChild(updateStatusBtn);
    document.querySelector(`[status-index="${i}"]`).addEventListener("click", function() {
      if(myLibrary[i].isRead) {
        myLibrary[i].isRead = false;
      } else {
        myLibrary[i].isRead = true;
      }
      populateTable();
    });
  }
}

populateTable();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidate();
});