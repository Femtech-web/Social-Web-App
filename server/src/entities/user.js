export default function user(fullname, password, email, role, createdAt) {
  return {
    FullName: fullname,
    Password: password,
    Email: email,
    Role: role,
    CreatedAt: createdAt
  };
}
