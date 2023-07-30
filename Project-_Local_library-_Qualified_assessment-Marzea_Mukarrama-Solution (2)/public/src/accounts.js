//Find an account by ID, return if there is a match
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

//Sort accounts by last name, (a, b)
function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.localeCompare(b.name.last));
}

//Find total number of times an account borrowed books
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;

  return books.reduce((totalBorrows, book) => {
    const borrowList = book.borrows;
    const count = borrowList.reduce((borrowCount, borrow) => {
      if (borrow.id === accountId) {
        return borrowCount + 1;
      }
      return borrowCount;
    }, 0);

    return totalBorrows + count;
  }, 0);
}

//Find which books are currently possesed by which account
function getBooksPossessedByAccount(account, books, authors) {
    const accountId = account.id;
    return books
    .filter(book => {
      const [recentBorrow] = book.borrows;
      return (
        recentBorrow.id === accountId &&
        recentBorrow.returned === false
      );
    })
    .map(book => {
      //Find author's information for each book
      const author = authors.find(author => author.id === book.authorId);
      return { ...book, author };
    });
}

//Export the functions
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};