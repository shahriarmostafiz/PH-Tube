const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  result = data.data;
  //   console.log(result);
  handleCategory(result);
};
const handleCategory = (data) => {
  const parentTab = document.getElementById("parentTab");
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `<button onclick="handleCards('${element.category_id}')" class="tab btn bg-gray-300 text-gray-500 hover:bg-red-500 border hover:text-white px-8 ">${element.category}</button>`;
    parentTab.appendChild(div);
  });
};
const handleCards = async (data) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${data}`
  );
  const output = await response.json();
  //   console.log(output);
  let result = output?.data;

  if (result.length === 0) {
    result = ["No Data Availble"];
  }

  //   console.log(result);
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  result.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("flex", "justify-center");
    if (card?.others?.posted_date) {
      const step0 = card.others.posted_date / (3600 * 24);
      const day = parseInt(step0);
      const hour = parseInt(card.others.posted_date / 3600);
      const step1 = card.others.posted_date / 3600 - hour;
      const minute = parseInt(step1 * 60);
      const time = ` ${hour} h ${minute} m ago `;
      //   const currentTime = new Date();
      //   const currentHour = currentTime.getHours();
      //   const currentMinutes = currentTime.getMinutes();

      card.others.posted_date = time;
    }
    cardDiv.innerHTML = `
    <div class=" card  w-96 h-[450px] bg-base-100 shadow-xl">
      <div class="relative h-48 border-2 ">
   <div class= " w-full h-full">
     <img class="w-full h-full object-cover "  src="${card?.thumbnail}" />
   </div>;
     <div class="absolute  bottom-0 right-0  flex   items-center justify-center">
       <p class="text-gray-200 text-xs  p-4">${card?.others?.posted_date}</p>
     </div>
   </div>;

  <div class="card-body">
    <h2 class="card-title">${card.title}</h2>

      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `;
    cardContainer.appendChild(cardDiv);
  });
};
loadCategory();
handleCards("1000");
