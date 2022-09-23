export class User {
}

export const getUserPosts = (userId) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.info(err)
    })

}


