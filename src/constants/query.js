export const USER_BY_USERNAME = `
query MyQuery($username: String = "") {
  users(where: {username: {_eq: $username}}) {
    id
    username
    password
  }
}
`