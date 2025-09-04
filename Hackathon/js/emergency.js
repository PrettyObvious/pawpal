document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("emergencyModal");
  const btn = document.getElementById("emergencyBtn");
  const span = document.querySelector(".modal .close"); // more specific

  btn.onclick = () => modal.style.display = "block";
  span.onclick = () => modal.style.display = "none";

  window.onclick = e => { if(e.target === modal) modal.style.display = "none"; };

  // form & image preview logic
  const form = document.getElementById("emergencyForm");
  const imageInput = document.getElementById("image");
  const imagePreview = document.getElementById("imagePreview");

  imageInput.addEventListener("change", function() {
    const file = this.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = e => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      }
      reader.readAsDataURL(file);
    } else {
      imagePreview.style.display = "none";
      imagePreview.src = "#";
    }
  });

  form.onsubmit = e => {
    e.preventDefault();
    if (!imageInput.files[0]) {
      alert("Please upload an image before submitting!");
      return;
    }
    alert("Emergency alert sent! (Backend integration needed)");
    modal.style.display = "none";
    form.reset();
    imagePreview.style.display = "none";
  };
});
