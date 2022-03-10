// This variables targets where the profile information will appear//
const overview = document.querySelector(".overview");
const username = "carlos-celfo";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const individualRepo = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
  filterInput.classList.remove("hide");
  for (let repo of repos) {
    let repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

// Adding a click event //

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    specificRepo(repoName);
  }
});

// Function to get specific repo info //

const specificRepo = async function (repoName) {
  const specificRequest = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await specificRequest.json();
  console.log(repoInfo);
  // Grab languages //
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  // Make a list of languages //
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  displayRepo(repoInfo, languages);
};

// Function to display specific repo info //

const displayRepo = function (repoInfo, languages) {
  individualRepo.innerHTML = "";
  individualRepo.classList.remove("hide");
  repoList.classList.add("hide");
  allRepos.classList.add("div");
  let div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  individualRepo.append(div);
  backButton.classList.remove("hide");
};

// Event for Back button //

backButton.addEventListener("click", function () {
  allRepos.classList.remove("hide");
  individualRepo.classList.add("hide");
  backButton.classList.add("hide");
});

// Input event to the search box//

filterInput.addEventListener("input", function (e) {
  let input = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchResult = input.toLowerCase();

  for (let repo of repos) {
    let result = repo.innerText.toLowerCase();
    if (result.includes(searchResult)) {
      repo.classList.remove("hide");
    } else if (!result.includes(searchResult)) {
      repo.classList.add("hide");
    }
  }
});

// Project is done //
