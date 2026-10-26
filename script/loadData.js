const loadData = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  showData(data.data);
};

const showData = (data) => {
  const container = document.getElementById("cardContainer");

  data.forEach((data) => {
    // console.log(data)
    const DIV = document.createElement("div");

    DIV.innerHTML = `
           <div onclick="handleShowDetails(${data.id})"  class="card  bg-base-100   shadow-sm h-full ${data?.status === "open" ? "border-t-4 border-[#00A96E]" : "border-t-4 border-[#A855F7]"}">
          <div class="card-body space-y-2">

            <div class="flex justify-between items-center">
                 ${
                   data?.status === "open"
                     ? '<img src="./assets/Open-Status.png" alt="Open" />'
                     : '<img src="./assets/Closed- Status .png" alt="Closed" />'
                 }

              
              <small class="px-3 bg-[#FEECEC] border border-[#FECACA] rounded-full text-[#EF4444]">${data?.priority}</small>
            </div>

            <h2 class="text-xl font-bold">${data?.title}</h2>
            <p class="text-gray-500">${data?.description}</p>

             <div class="flex flex-wrap items-center gap-2">
            ${data?.labels.map((lab) => `
                <span class="px-3 bg-[#FFF8DB] border border-[#D97706] rounded-full text-[#D97706]">${lab}</span>`).join("")}
            </div>
             
              <div class="divider "></div>

            <div class="text-gray-500">
              <p>#1 by ${data?.author}</p>
              <p>${data?.createdAt}</p>
            </div>
          </div>
        </div>
        `;
    container.appendChild(DIV);
  });
};

const handleShowDetails = async (id) => {
  document.getElementById("showDetailsModal").showModal();
  console.log(id);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showDetails(data.data);
};

const showDetails = (Data) => {
  console.log(Data);
  const modal = document.getElementById("modalContain");
  modal.innerHTML = "";

  const DIV = document.createElement("div");

  DIV.innerHTML = `
        <div class="space-y-4">
        <h3 class="text-xl font-bold">${Data?.title}</h3>
            <div class="flex items-center gap-4">
              <p class="bg-[#00A96E] text-white px-4 rounded-full">Open</p>

              <span class="text-gray-400 text-sm">Opened by ${Data?.author}</span>
              <span class="text-gray-400 text-sm">
                    ${new Date(Data?.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
              </span>
              
            </div>

          
            <div class="flex items-center gap-2">
            ${Data?.labels.map((lab) => `
                <span class="px-3 bg-[#FFF8DB] border border-[#D97706] rounded-full text-[#D97706]">${lab}</span>`).join("")}
            </div>
           

            <p class="text-gray-400">${Data?.description}</p>

            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div class="flex-1">
                <h6>Assignee</h6>
                ${
                  Data?.assignee
                    ? `<h3 class="text-lg font-bold">${Data?.assignee}</h3>`
                    : `<h3 class="text-lg font-bold">${Data?.author}</h3>`
                }
              </div>

              <div class="flex-1">
                <h6 class="text-lg font-bold">priority</h6>
                <span class="bg-[#EF4444] text-white px-4 rounded-full">${Data?.priority}</span>
              </div>

            </div>
        
        </div>
    `;

  modal.appendChild(DIV);
};

loadData();
