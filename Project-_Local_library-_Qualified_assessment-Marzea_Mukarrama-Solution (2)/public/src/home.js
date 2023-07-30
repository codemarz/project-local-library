//Get the total number of books
function getTotalBooksCount(books) {
  return books.length;
}

//Get the total number of accounts
function getTotalAccountsCount(accounts) {
   return accounts.length;
}

//Find out how many books are currently borrowed
function getBooksBorrowedCount(books) {
    let count = 0;
  for (let book of books) {
    const [firstTransaction] = book.borrows;
    if (!firstTransaction.returned) {
      count++;
    }
  }
  return count;
}


//Get the most common genres 
function getMostCommonGenres(books) {
    const genreCounts = {};

  for (const book of books) {
    const genre = book.genre;
    if (genreCounts.hasOwnProperty(genre)) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  }

  const genresArray = Object.keys(genreCounts).map((genre) => ({
    name: genre,
    count: genreCounts[genre],
  }));

  const sortedGenres = genresArray.sort((a, b) => b.count - a.count);

  return sortedGenres.slice(0, 5);
}

//Find an author by ID
function findAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId);
}

//Find most popular books based on the number of borrows
function getMostPopularBooks(books) {
   const bookPopularity = [];
  for (const book of books) {
    const { title, borrows } = book;
    const borrowCount = borrows.length;
    bookPopularity.push({ name: title, count: borrowCount });
  }
  bookPopularity.sort((a, b) => b.count - a.count);
  return bookPopularity.slice(0, 5);
}

//Find most popular authors based on number of times their books were borrowed
function getMostPopularAuthors(books, authors) {
    const authorBorrowCounts = {};
  for (const book of books) {
    const { authorId, borrows } = book;
    const author = findAuthorById(authors, authorId);
    authorBorrowCounts[author.name.first + " " + author.name.last] =
      (authorBorrowCounts[author.name.first + " " + author.name.last] || 0) +
      borrows.length;
  }
  const popularAuthors = Object.entries(authorBorrowCounts).map(
    ([name, count]) => ({
      name,
      count,
    })
  );
  popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count);
  return popularAuthors.slice(0, 5);
}


//Export functions
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

