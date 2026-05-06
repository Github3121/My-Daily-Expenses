function tapToRefresh() {
  loadSheetTotal();
  setTimeout(() => {
    loadSheetTotal();
  }, 5000);
}
async function loadSheetTotal() {
  const api =
    "https://script.google.com/macros/s/AKfycbz8C3XyB7cN_LxtpdxzOBjIsOrgp-8KBduS0c-ZvQfDS-db52LUwNUsjS0d4BQ6A6MOKw/exec";
  try {
    document.getElementById("loading").style.display = "grid";
    const res = await fetch(api);
    const data = await res.json();
    let totalCost = "";
    for (let singleData of data.total) {
      totalCost = Number(totalCost) + singleData.total;
    }
    document.getElementById("loading").style.display = "none";
    if (data.total.length > 0) {
      document.getElementById("scalData").style.display = "grid";
    }
    displayData(totalCost);
    displayAllData(data.total);
  } catch (err) {
    console.error("Error fetching total:", err);
  }
}
function displayData(totalcost) {
    const displayCount = document.getElementById("dailyTotalDisplay");
    displayCount.innerHTML = "";
    const newZD = document.createElement("div");
    newZD.innerHTML = `${totalcost ? totalcost : "00.0"} <span class="text-2xl font-light ml-2">Taka</span>`;
    displayCount.append(newZD);
    console.log(totalcost);
}
const displayAllData = (detailData) => {
  const dataShowDisplay = document.getElementById("dataShowDisplay");
  dataShowDisplay.innerHTML = ""; 
  for (let singleDetailData of detailData) {
      const rawDate = singleDetailData.date;
      const datePart = rawDate.split('T')[0];
      const [year, month, day] = datePart.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      const htmlRow = `
        <tr class="hover:bg-gray-50 transition-colors border-b">
          <td class="px-6 py-4 text-gray-700 font-medium">${formattedDate}</td>
          <td class="px-6 py-4">${singleDetailData.itemName}</td>
          <td class="px-6 py-4">${singleDetailData.quantity}</td>
          <td class="px-6 py-4">${singleDetailData.unitPrice}৳</td>
          <td class="px-6 py-4 font-semibold text-green-600">${singleDetailData.total}৳</td>
          <td class="px-6 py-4 italic text-gray-400">${singleDetailData.location}</td>
          <td class="px-6 py-4 italic text-gray-400">${singleDetailData.details}</td>
        </tr>
      `;
    
    // সরাসরি টেবিলের ভেতরে রো যোগ করা হচ্ছে
    dataShowDisplay.insertAdjacentHTML("beforeend", htmlRow);
  }
}
// পেজ লোড হলে টোটাল লোড হবে
window.addEventListener("load", loadSheetTotal);