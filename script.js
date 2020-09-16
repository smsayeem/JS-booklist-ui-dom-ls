function addBookToTable(book){
  // table body
  const list = document.getElementById('book-list')
  // create 'tr'
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML=`
    <td>${book.title}</td>  
    <td>${book.author}</td>  
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>delete</td>
  `;
  list.appendChild(row);
}
function showAlert(message, className){
  // create div
  const div = document.createElement('div');
  div.className= `alert ${className}`;
  // add text
  const textNode = document.createTextNode(message);
  div.appendChild(textNode);

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // insert alert before form
  container.insertBefore(div,form);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);

}
function deleteBook(target){
  if(target.className==='delete'){
    // remove the 'tr'
    target.parentElement.parentElement.remove();
  }
}
function clearFields(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

// event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const book = {title, author,isbn}

  // valdate form input field
  if(title==='' || author==='' || isbn === ''){
    // error alert
    showAlert('Please fill in all fields', 'error');
  }else{
    // Add book to the table list
    addBookToTable(book);
    // show success aler message
    showAlert('Book added!', 'success');
    // Clear fields
    clearFields(); 
  }
  e.preventDefault();
})


// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  deleteBook(e.target)
  showAlert('Book removed', 'success')
  e.preventDefault();
})
