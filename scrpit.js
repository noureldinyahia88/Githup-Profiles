const APIURL = 'https://api.github.com/users/'
const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

async function getUser(username) {
    try{
        const { data } = await axios(APIURL + username)

        creatusercard(data) //line 41
    } catch(err) {
        if(err.response.status == 404){
            creatErrorCard('No Profile With This User Name') //line 62
        }
    }
}

async function getRepos(username) {
    try{
        const { data } = await axios(APIURL + username +'/repos')

        addRepodToCard(data) // line 28
    } 
    catch(err) {creatErrorCard('Problem fetching repos')}
}


function addRepodToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos.forEach(repo => {
        const repoEL = document.createElement('a')
        repoEL.classList.add('repo')
        repoEL.href = repo.html_url
        repoEL.target = '_blank'
        repoEL.innerText = repo.name

        reposEl.appendChild(repoEL)
    })
}
function creatusercard(user) {
    const cardHTML = ` <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Follwing</strong></li>
            <li>${user.public_repos} <strong>repos</strong></li>
        </ul>

        <div id="repos"></div>
    </div>
</div>`
main.innerHTML = cardHTML
}

function creatErrorCard(msg){
    const cardHTML = `
    <div class="card">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = cardHTML
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const user = search.value
    if(user){
        getUser(user)
        search.value = ''
    }
})
