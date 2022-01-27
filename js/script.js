// This variables targets where the profile information will appear//
const overview = document.querySelector(".overview");
const username = "carlos-celfo";

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
    <p><strong>Number of public repos:</strong> ${data.repos}</p>
    </div>`;
  overview.append(newDiv);
};
