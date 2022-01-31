// This variables targets where the profile information will appear//
const overview = document.querySelector(".overview");
const username = "carlos-celfo";
const repoList = document.querySelector(".repo-list");

// Fecth API JSON data //

const showProjects = async function () {
  const projectsRequest = await fetch(
    `https://api.github.com/users/${username}`
  );
  const data = await projectsRequest.json();
  console.log(data);
  displayInfo(data);
};

showProjects();

// Fetch and Display user information //

const displayInfo = function (data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user-info");
  newDiv.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(newDiv);
};

// Fetching the repos //

const myRepos = async function () {
  const reposRequest = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repos = await reposRequest.json();
  console.log(repos);
};

myRepos();

// Function to display info about repos //

const repoInfo = function (repos) {
  for (let repos of repoInfo) {
    let document.createElement("li");
    li.classList.add("repo");
    li.innerHTML=`<h3>${repo.name}</h3>`;
  }
  li.append(".repoList");
};

