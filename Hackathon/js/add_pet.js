const fileInput = document.querySelector('#image');
const preview = document.querySelector('#imagePreview');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) 
    {
        const reader = new FileReader();
        reader.onload = function(e) 
        {
            preview.innerHTML = `<img src="${e.target.result}" alt="Pet Image">`;
        }
        reader.readAsDataURL(file);
    } 
    else 
    {
        preview.innerHTML = "No image selected";
    }
});