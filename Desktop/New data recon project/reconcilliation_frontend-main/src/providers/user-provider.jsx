const UserProfile = (() => {
  
    // Check if user data exists in localStorage during initialization
    const is_authenticated = () =>{ 
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
       return true
      }
      return false
    }
  
    const data = () => {
      const userDataString = localStorage.getItem('user');
      const userData = JSON.parse(userDataString);
      return userData;
    };

    // const logout = () => {
    //     localStorage.removeItem('user');
    //     is_authenticated = false
    // }
  
    return {
      data,
      is_authenticated,
    //   logout
    };
  })();
  
  export default UserProfile;
  