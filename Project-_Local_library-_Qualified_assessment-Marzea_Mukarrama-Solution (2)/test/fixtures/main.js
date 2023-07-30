function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}