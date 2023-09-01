let sort = false;
const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  let result = data.data;

  handleCategory(result);
};
const handleCategory = (data) => {
  const parentTab = document.getElementById("parentTab");
  parentTab.textContent = "";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `<button onclick="handleCards('${element.category_id}')"  class="tab btn bg-gray-300 text-gray-500 hover:bg-red-500 border hover:text-white px-8 ">${element.category}</button>`;
    parentTab.appendChild(div);
  });
};
const handleCards = async (data) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${data}`
  );
  const output = await response.json();
  let result = output?.data;
  if (sort) {
    result = result.sort((a, b) => {
      let v1 = a.others?.views;
      let v2 = b.others?.views;
      let value1 = parseInt(v1);
      let value2 = parseInt(v2);
      return value2 - value1;
    });
  }
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  if (result.length === 0) {
    const undefinedDiv = document.createElement("div");
    undefinedDiv.classList.add(
      "flex",
      "lg:col-span-4",
      "md:col-span-2",
      "justify-center"
    );
    undefinedDiv.innerHTML = `<div class="w-full  h-screen flex flex-col gap-4 justify-center items-center ">
    <img src="./Icon.png" alt="" />
    <p class= "text-3xl font-medium text-center">Ooops!!! Sorry, There is no <br >content here </p></div>`;
    cardContainer.appendChild(undefinedDiv);
  } else {
    result.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("flex", "justify-center");
      if (card?.others?.posted_date) {
        const step0 = card.others.posted_date / (3600 * 24);
        const day = parseInt(step0);
        const hour = parseInt(card.others.posted_date / 3600);
        const step1 = card.others.posted_date / 3600 - hour;
        const minute = parseInt(step1 * 60);
        const time = ` ${hour}h ${minute}m ago `;
        card.others.posted_date = time;
      } else {
        card.others.posted_date = "";
      }
      const url = "./fi_10629607.svg";
      if (card?.authors[0]?.verified) {
        card.authors[0].verified = url;
      } else {
        card.authors[0].verified = "";
      }
      cardDiv.innerHTML = `
    <div class=" card card-compact w-96 h-[350px] bg-base-100 shadow-xl">
      <div class="relative h-48">
   <div class= "w-full h-full">
     <img class="w-full h-full object-cover rounded-t-lg"  src="${
       card?.thumbnail
     }" />
   </div>
     <div class="absolute  bottom-3 right-3  flex   items-center justify-center">
       <p class="text-white text-lg ${
         card?.others?.posted_date
           ? "bg-black bg-opacity-60 rounded-lg p-1 px-2"
           : ""
       }">${card?.others?.posted_date}</p>
     </div>
   </div>
  <div class="card-body">
    <div class="flex gap-2 items-center justify-center">
    <div class="avatar">
  <div class="w-[60px] h-[60px] rounded-full">
    <img src=${card?.authors[0]?.profile_picture} alt="not found"/>
  </div>
</div>
     
      <div class="w-full ">
        <h1 class="text-2xl font-medium">${card.title}</h1>
        <div class="flex gap-2 items-center">
          <p class="text-gray-500  max-w-fit text-lg ">${
            card?.authors[0]?.profile_name
          }</p>
          <img src = '${card?.authors[0]?.verified}' >
        </div>
        <p class="text-gray-500  max-w-fit text-lg ">${
          card?.others?.views
        } views</p>
      </div>
    </div>
    </div>
  </div>
</div>
    `;
      cardContainer.appendChild(cardDiv);
    });
  }
};
loadCategory();
handleCards("1000");
const handleSort = () => {
  sort = true;
  handleCards("1000");
};
const blog = document.getElementById("blog");
blog.addEventListener("click", () => {
  window.location.href = "blog.html";
});
