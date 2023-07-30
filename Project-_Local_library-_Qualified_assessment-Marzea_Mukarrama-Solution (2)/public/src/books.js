//Find an author by ID
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

//Find a book by ID
function findBookById(books, id) {
   return books.find(book => book.id === id);
}

//Separating based on their status, checkedOut or returned
function partitionBooksByBorrowedStatus(books) {
   const checkedOutBooks = [];
  const returnedBooks = [];

  for (const book of books) {
    const [latestTransaction] = book.borrows;
    if (latestTransaction.returned) {
      returnedBooks.push(book);
    } else {
      checkedOutBooks.push(book);
    }
  }

  return [checkedOutBooks, returnedBooks];
}

//Find the borrower for a book, the account information of the borrower, and return status
function getBorrowersForBook(book, accounts) {
    const borrowers = book.borrows.map(transaction => {
    const account = accounts.find(acc => acc.id === transaction.id);
    return { ...account, returned: transaction.returned };
  });

  return borrowers.slice(0, 10);
}

//Export the functions 
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};