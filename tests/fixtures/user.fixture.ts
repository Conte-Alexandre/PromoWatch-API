export const createFakeUser = () => {
  const timestamp = Date.now();
  return {
    email: `user_${timestamp}@test.com`,
    password: "Password123!",
    name: "Test User",
    role: "Creator",
  };
};
export const createWrongCredentials = () => {
  return {
    email: "notUser@test.com",
    password: "notPassword",
  };
};
