document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("watched-list");
  const watched = JSON.parse(localStorage.getItem("watchedVideos") || "[]");

  watched.forEach(url => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.textContent = url;
    li.appendChild(a);
    list.appendChild(li);
  });
});
