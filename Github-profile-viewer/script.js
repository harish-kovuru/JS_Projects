function fetchProfile(){
    const username = document.getElementById('username').value
    if(!username){
        alert('Please enter a username')
        return 
    }
    const url = `https://api.github.com/users/${username}`
    fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error ("Network response is not ok")
            }
            return response.json()
        })
        .then(data => {
            displayProfile(data)
        })
        .catch(error => console.error('Error fetching profile:', error))
}
function displayProfile(data){
    const profile = document.getElementById('profile')
    profile.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${data.avatar_url}" alt="${data.name}" width="200" height="200">
    <p>${data.bio}</p>
    <p>Followers: ${data.followers}</p>
    <p>Following: ${data.following}</p>
    <p>Public Repos: ${data.public_repos}</p>
    <p>Location: ${data.location}</p>
    <p>Blog: <a href="${data.blog}" target="_blank">${data.blog}</a></p>
    `
}
