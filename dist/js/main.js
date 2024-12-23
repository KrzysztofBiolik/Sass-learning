const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
  menuNav.classList.toggle("open");
  navItems.forEach((item) => item.classList.toggle("open"));
}

async function changeBg(bg, title) {
  const banner = document.querySelector(".banner");
  const contents = document.querySelector(".banner__content");

  const repo = await axios.get(
    `https://api.github.com/repos/krzysztofbiolik/${title}`
  );
  const repoData = await repo.data;
  console.log(repoData);

  banner.style.background = `url("./img/${bg}")`;
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";

  contents.innerHTML = `  
    <h2>${repoData.name}</h2>
    <p>${repoData.description}</p>
    <div class="button">
      <a 
      target="_blank"
      rel="noreferrer"
      href="${repoData.homepage}">
        <i class="fa fa-play" aria-hidden="true"></i>
          Demo
      </a>
      <a 
      target="_blank"
      rel="noreferrer"
      href="${repoData.html_url}">
        <i class="fa fa-plus" aria-hidden="true"></i>
          Code
      </a>  
    </div>    
`;
}

const getGithubRepos = async () => {
  const { data } = await axios.get(
    "https://api.github.com/users/krzysztofbiolik/repos"
  );

  return data.map((repo, index) => ({
    name: repo.name,
    imageName: `project-${index + 1}`,
  }));
};

const displayRepos = async () => {
  const reposData = await getGithubRepos();
  htmlString = "";

  for (const result of reposData) {
    console.log(
      (htmlString += `
        <div class="carousel-item" onclick="changeBg('bg-${result.name}.jpg', '${result.name}')">
          <img src="./img/${result.imageName}.jpg" alt="${result.name}" />
        </div>
      `)
    );
  }

  document.querySelector(".carousel").innerHTML = htmlString;
};

displayRepos();


