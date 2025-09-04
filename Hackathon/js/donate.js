document.addEventListener("DOMContentLoaded", () => {
  // NAV MENU
  const navLinks = document.getElementById("navLinks");
  window.showMenu = () => { navLinks.style.right = "0"; };
  window.hideMenu = () => { navLinks.style.right = "-200px"; };

  // DONATE MODAL
  const modal = document.getElementById("donateModal");
  const closeBtn = modal.querySelector(".donate-close"); // updated class
  const donationDetails = document.getElementById("donationDetails");

  // Attach donate button handlers
  function attachDonateHandlers() {
    document.querySelectorAll(".donate-btn").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const shelterName = this.getAttribute("data-shelter");
        donationDetails.innerHTML = `
          You are donating to <strong>${shelterName}</strong>.<br><br>
          Bank: PawPal Bank<br>
          Acc No: 123456789<br>
          Reference: ${shelterName}
        `;
        modal.style.display = "block";
      });
    });
  }

  attachDonateHandlers();

  // Close modal
  closeBtn.onclick = () => { modal.style.display = "none"; };
  window.onclick = e => {
    if (e.target == modal) modal.style.display = "none";
  };

  // SEARCH SHELTERS - DYNAMIC CARDS
  window.searchShelters = async function () {
    const query = document.getElementById("searchInput").value;
    const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
    const shelters = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // clear previous results

    shelters.forEach(s => {
      const card = document.createElement("div");
      card.classList.add("result-card");
      card.innerHTML = `
        <h3>${s.name}</h3>
        <p class="shelter-address">${s.address}</p>
        <div class="card-buttons">
          <a href="adopt.html?shelter_id=${s.id}" class="card-btn adopt-btn">Adopt a Pet</a>
          <a href="give.html?shelter_id=${s.id}" class="card-btn give-btn">Give a Pet for Adoption</a>
          <a href="#" class="card-btn donate-btn" data-shelter="${s.name}">Donate</a>
          <a href="volunteer.html?shelter_id=${s.id}" class="card-btn volunteer-btn">Volunteer</a>
        </div>
      `;
      resultsDiv.appendChild(card);
    });

    attachDonateHandlers(); // reattach for new buttons
  };
});
