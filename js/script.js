// This variables targets where the profile information will appear//
const overview = document.querySelector(".overview");
const username = "carlos-celfo";
const listOfRepos = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const individualRepo = document.querySelector(".repo-data");

// Fecth API JSON data //

const showProjects = async function () {
  const projectsRequest = await fetch(
    `https://api.github.com/users/${username}`
  );
  const data = await projectsRequest.json();
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
  myRepos();
};

// Fetching the repos //

const myRepos = async function () {
  const reposRequest = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await reposRequest.json();
  repoInfo(repoData);
};

// Function to display info about repos //

const repoInfo = function (repos) {
  for (let repo of repos) {
    let repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    listOfRepos.append(repoItem);
  }
};

//Why for creating a document we need a new variable?//

// Adding a click event //

const repoList = listOfRepos.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = (repoItem.innerText = `${repo.name}`);
  }
  console.log(repoName);
});
