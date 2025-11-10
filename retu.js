const menu = document.getElementById("menu");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const searchInput = document.getElementById("inputs");
const searchBtn = document.querySelector(".search-btn");
const boxes = document.querySelectorAll(".box");
const buy = document.querySelectorAll(".buy");

// Menu open
menu.addEventListener("click", () => {
  nav.classList.add("active");
  overlay.classList.add("active");
});

// Menu close
overlay.addEventListener("click", () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");
});

// SEARCH BUTTON
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const query = searchInput.value.toLowerCase().trim();
  
  // If empty → show all
  if (!query) {
    boxes.forEach(box => box.style.display = "block");
    return;
  }
  
  let scoredResults = [];
  
  boxes.forEach(box => {
    const name = box.querySelector(".name").textContent.toLowerCase().trim();
    let score = 0;
    
    for (let char of query) {
      if (name.includes(char)) {
        score++;
      }
    }
    
    scoredResults.push({ box, score });
  });
  
  scoredResults.sort((a, b) => b.score - a.score);
  
  boxes.forEach(box => box.style.display = "none");
  
  let shown = 0;
  
  for (let item of scoredResults) {
    if (item.score > 0 && shown < 3) {
      item.box.style.display = "block";
      shown++;
    }
  }
});

//  AUTO REFRESH SYSTEM (search clear করলে সব ফিরে আসবে)
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.trim();
  
  if (!query) {
    // reset to default state
    boxes.forEach(box => box.style.display = "block");
  }
});
const buyBtns = document.querySelectorAll(".buy");
const popup = document.getElementById("poporder");
const closeBtn = popup.querySelector(".close");

const foodInput = document.getElementById("foodName");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerAddress = document.getElementById("customerAddress");
const packetQty = document.getElementById("packetQty");
const confirmBtn = document.getElementById("confirmOrder");

// Open popup
buyBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const foodName = btn.closest(".box").querySelector(".name").textContent;
    foodInput.value = foodName;
    popup.style.display = "flex";
  });
});

// Close popup
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Confirm button → WhatsApp
confirmBtn.addEventListener("click", () => {
  const name = customerName.value.trim();
  const phone = customerPhone.value.trim();
  const address = customerAddress.value.trim();
  const qty = packetQty.value.trim();
  const food = foodInput.value;
  
  if (!name || !phone || !address || !qty) {
    alert("সব তথ্য পূরণ করুন!");
    return;
  }
  
  // WhatsApp link
  const message = `আমার অর্ডার:\nডিশ: ${food}\nপ্যাকেট: ${qty}\nনাম: ${name}\nফোন: ${phone}\nঠিকানা: ${address}`;
  const waLink = `https://wa.me/8801804187223?text=${encodeURIComponent(message)}`;
  
  window.open(waLink, "_blank"); // open WhatsApp
  
  // Close popup after sending
  popup.style.display = "none";
  
  // Clear form
  customerName.value = "";
  customerPhone.value = "";
  customerAddress.value = "";
  packetQty.value = "";
});