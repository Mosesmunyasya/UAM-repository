import UserProfile from "src/providers/user-provider";

export const account = {
  displayName: `${UserProfile.is_authenticated() ? UserProfile.data().first_name : ''}`,
  email: `${UserProfile.is_authenticated() ? UserProfile.data().email : ''}`,
  photoURL: '/assets/images/avatars/avatar_1.jpg',
};
