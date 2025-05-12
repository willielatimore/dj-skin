document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value).toFixed(2);
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;
  
    const newProduct = {
      name,
      price,
      category,
      image
    };
  
    // Get existing products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
  
    alert('Product added successfully!');
    this.reset();
  });
    // Image Preview
  document.getElementById('product-image').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById('image-preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
  