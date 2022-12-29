import { mockUserDetails } from './UsersDetails';

export const mockUsers = mockUserDetails.map((user) => {
  return { id: user.id, name: user.name };
});
