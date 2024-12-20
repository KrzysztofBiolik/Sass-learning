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

function changeBg(bg, title) {
  const banner = document.querySelector(".banner");
  const contents = document.querySelectorAll(".banner__content");
  banner.style.background = `url("./img/${bg}")`;
  banner.style.backgrounSize = "cover";
  banner.style.backgroundPosition = "center";

  contents.forEach((content) => {
    content.classList.remove("active");
    if (content.classList.contains(title)) {
      content.classList.add("active");
    }
  });
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
        <div class="carousel-item" onclick="changeBg('${result.imageName}.jpg', '${name}')">
          <img src="./img/${result.imageName}.jpg" alt="${result.name}" />
        </div>
      `)
    );
  }

  document.querySelector(".carousel").innerHTML = htmlString;
};



displayRepos();

const getGithubRepo = () => {
  fetch("https://api.github.com/repos/krzysztofbiolik/Todos-list-react")
    .then((res) => res.json())
    .then((data) => data[8])
    .then((result) => console.log(result.description));
};
