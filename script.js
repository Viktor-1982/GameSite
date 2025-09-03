document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("gamesGrid");
  const modal = document.getElementById("playerModal");
  const frame = document.getElementById("playerFrame");
  const title = document.getElementById("playerTitle");
  const openNew = document.getElementById("playerOpenNew");
  const closeBtn = document.getElementById("playerClose");
  const fullscreenBtn = document.getElementById("playerFullscreen");

  // Загружаем JSON
  let games = [];
  try {
    const res = await fetch("games.json");
    games = await res.json();
  } catch (err) {
    console.error("Ошибка загрузки games.json", err);
  }

  // Рисуем карточки
  grid.innerHTML = games.map(game => `
    <article class="card">
      <img src="${game.cover}" alt="${game.title}" class="card__cover">
      <div class="card__body">
        <h3 class="card__title">${game.title}</h3>
        <p class="card__desc">${game.desc}</p>
        <button class="btn play-btn" data-url="${game.url}" data-title="${game.title}">Играть</button>
      </div>
    </article>
  `).join("");

  // Навешиваем обработчики
  document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const gameUrl = btn.dataset.url;
      const gameTitle = btn.dataset.title;

      frame.src = gameUrl;
      title.textContent = gameTitle;
      openNew.href = gameUrl;

      modal.classList.add("is-open");
    });
  });

  // Закрытие
  function closeModal() {
    modal.classList.remove("is-open");
    frame.src = "";
  }
  closeBtn.addEventListener("click", closeModal);
  document.querySelector(".modal__backdrop").addEventListener("click", closeModal);

  // Полный экран
  fullscreenBtn.addEventListener("click", () => {
    if (frame.requestFullscreen) frame.requestFullscreen();
  });

  console.log("✅ JSON каталог игр подгружен");
});
