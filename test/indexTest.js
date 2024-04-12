fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((toys) => renderToys(toys));

const mainDiv = document.getElementById("toy-collection");
function renderToys(toys) {
  toys.forEach((toy) => {
    const container = document.createElement("div");
    container.className = "card";
    let h2 = document.createElement("h2");
    h2.innerText = toy.name;

    let img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";

    let p = document.createElement("p");
    p.innerText = `${toy.likes} likes`;

    let btn = document.createElement("button");
    btn.className = "like-btn";
    btn.id = toy.id;
    btn.innerText = "Like ❤️";
    btn.addEventListener("click", (e) => {
      likeFunction(e);
    });
    container.append(h2, img, p, btn);
    mainDiv.appendChild(container);
  });
}
const submitForm = document.querySelector(".add-toy-form");
submitForm.addEventListener("submit", (e) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((toys) => renderToys(toys));
});

function likeFunction(e) {
  e.preventDefault();
  let likesElement = e.target.previousElementSibling;
  let likes = parseInt(likesElement.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: likes,
    }),
  })
    .then((res) => res.json())
    .then((toys) => renderToys(toys))
    .catch((error) => {
      console.error("Error updating likes:", error);
    });
}
