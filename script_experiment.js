
//  ------------ FORM SUBMIT EVENT LISTENER ------------------ //
document.getElementById('book-form').addEventListener('submit', function(e){
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const book={title:title, author:author, isbn:isbn}

  if(title === '' || author === '' || isbn === ''){
    notification('Please fill in all fields', 'error');
  }else{
    UI.addBookToTable(book);
    Store.addLSBook(book);
    UI.clearFormFields();
    UI.notification('Book added!', 'success');
  }

  e.preventDefault();
})

//  ------------ DELETE BOOK EVENT LISTENER ------------------ //
document.querySelector('#book-list').addEventListener('click', function(e){
  UI.deleteBook(e.target);
  Store.removeLSBook(e.target.parentElement.previousElementSibling.textContent)
})

class UI{
//  ------------ ADD BOOK ------------------ //
  static addBookToTable(book){
    const tBody = document.querySelector('#book-list');
    const tr = document.createElement('tr');

    tr.innerHTML = `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class='delete'>Delete</a></td>
    </tr>
    `;
    tBody.appendChild(tr);
  }

//  ------------ DELETE BOOK ------------------ //
  static deleteBook(target){ 
    if(target.className==='delete'){
      target.parentElement.parentElement.remove();
      notification('Book deleted!', 'error');
    } 
  }

//  ------------ CLEAR FORM ------------------ //
  static clearFormFields(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
  }

//  --------------- NOTIFICATION --------------- //
  static notification(message, className){
    const div = document.createElement('div');
    div.className=`message-box ${className}`;
    const textNode = document.createTextNode(message);
    div.appendChild(textNode);

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector('.message-box').remove();
    }, 3000);
  }

}

//  --------------- LOCAL STORAGE TO FETCH DATA --------------- //
class Store{
    static getLSBooks(){
      let books;
      if(localStorage.getItem('books') === null){
        books=[]
      }else{
        books= JSON.parse(localStorage.getItem('books'))
      }
      return books;
    }

    static displayLSBooks(){
      const books = Store.getLSBooks();
      books.forEach(book=>UI.addBookToTable(book))
    }

    static addLSBook(book){
      const books = Store.getLSBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeLSBook(isbn){
      const books = Store.getLSBooks();
      books.forEach((item,i) => {
        if (item.isbn===isbn){
          books.splice(i,1);
        }
        
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM load event - when we refresh the browser
document.addEventListener('DOMContentLoaded', Store.displayLSBooks());