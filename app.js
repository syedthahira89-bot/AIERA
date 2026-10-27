const stories = [
  {
    category: "Machine learning",
    readTime: "6 min read",
    title: "Small models, big ideas: intelligence at the edge",
    summary: "The next wave of useful AI may not live in the cloud. Meet the compact models bringing powerful tools closer to everyone.",
    author: "Noah Williams",
    date: "Oct 18, 2026",
    tone: "green",
    glyph: "◉",
    label: "INTELLIGENCE, EVERYWHERE"
  },
  {
    category: "AI & society",
    readTime: "9 min read",
    title: "Who gets to decide what responsible AI means?",
    summary: "As AI enters everyday life, communities are asking how values can be built into the systems shaping their futures.",
    author: "Leila Okafor",
    date: "Oct 15, 2026",
    tone: "blue",
    glyph: "↗",
    label: "PEOPLE + PROGRESS"
  },
  {
    category: "Creative AI",
    readTime: "5 min read",
    title: "When the machine becomes your creative collaborator",
    summary: "Artists and generative tools are finding a new rhythm—not replacing imagination, but giving it unexpected places to go.",
    author: "Sofia Alvarez",
    date: "Oct 12, 2026",
    tone: "pink",
    glyph: "✳",
    label: "A NEW CREATIVE LANGUAGE"
  },
  {
    category: "Future tech",
    readTime: "7 min read",
    title: "A field guide to the next era of robotics",
    summary: "From helpful home robots to adaptable machines in the wild, embodied AI is moving from lab demos to real life.",
    author: "Theo Martin",
    date: "Oct 09, 2026",
    tone: "yellow",
    glyph: "⌘",
    label: "ROBOTS, REIMAGINED"
  },
  {
    category: "Machine learning",
    readTime: "8 min read",
    title: "Can we teach AI to know what it doesn't know?",
    summary: "A closer look at uncertainty, trust, and the research helping models communicate the limits of their answers.",
    author: "Priya Nair",
    date: "Oct 06, 2026",
    tone: "purple",
    glyph: "∿",
    label: "THE SHAPE OF UNCERTAINTY"
  },
  {
    category: "AI & society",
    readTime: "4 min read",
    title: "The future of work is a question, not a forecast",
    summary: "Instead of asking which jobs AI will replace, what if we asked what better work could look like for more people?",
    author: "Amara Brooks",
    date: "Oct 02, 2026",
    tone: "orange",
    glyph: "∞",
    label: "WORK, REWRITTEN"
  }
];

const articleGrid = document.querySelector("#article-grid");
const searchInput = document.querySelector("#story-search");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const topicButtons = [...document.querySelectorAll(".topic-button")];
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
let activeTopic = "All";

function renderStories() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredStories = stories.filter((story) => {
    const matchesTopic = activeTopic === "All" || story.category === activeTopic;
    const searchableText = `${story.category} ${story.title} ${story.summary} ${story.author}`.toLowerCase();
    return matchesTopic && searchableText.includes(query);
  });

  articleGrid.innerHTML = filteredStories.map((story) => `
    <article class="article-card">
      <div class="article-visual article-visual--${story.tone}" aria-hidden="true">
        <span class="visual-glyph">${story.glyph}</span>
        <span class="visual-label">${story.label}</span>
      </div>
      <div class="article-card-copy">
        <div class="article-meta"><span>${story.category}</span><span>${story.readTime}</span></div>
        <h3>${story.title}</h3>
        <p>${story.summary}</p>
        <div class="card-byline"><span>${story.author}</span><span>${story.date}</span></div>
      </div>
    </article>
  `).join("");

  resultsCount.textContent = `${filteredStories.length} ${filteredStories.length === 1 ? "STORY" : "STORIES"}`;
  emptyState.hidden = filteredStories.length > 0;
}

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTopic = button.dataset.topic;
    topicButtons.forEach((topicButton) => {
      const isActive = topicButton === button;
      topicButton.classList.toggle("is-active", isActive);
      topicButton.setAttribute("aria-pressed", String(isActive));
    });
    renderStories();
  });
});

searchInput.addEventListener("input", renderStories);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    renderStories();
    searchInput.blur();
  }
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  }
});

renderStories();
