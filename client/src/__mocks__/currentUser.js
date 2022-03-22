const currentUser = {
  id: 'k3nQJ2a9fMcDIku6wBZObXMjpYo1',
  username: 'John Doe',
  email: 'johndoe@gmail.com',
};

jest.mock('currentUser', () => ({
  mockCurrentUser: () => currentUser,
}));

export default currentUser;