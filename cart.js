
    const productsContainer = document.getElementById("products");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const searchInput = document.getElementById("search");

    let products = [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];



    // Fetch products from Fake Store API
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        products = data;
        renderProducts(products);
        renderCart();
      });



   
    function renderProducts(list) {
      productsContainer.innerHTML = "";
      list.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.style.backgroundColor = "white"
        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h4>${product.title.substring(0, 40)}...</h4>
          <p>₹${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(div);
      });
    }



    
    searchInput.addEventListener("input", e => {
      const keyword = e.target.value.toLowerCase();
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(keyword)
      );
      renderProducts(filtered);
    });



    
    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      saveCart();
      renderCart();
    }



    
    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      saveCart();
      renderCart();
    }



    
    function updateQuantity(id, qty) {
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity = parseInt(qty) || 1;
      }
      saveCart();
      renderCart();
    }



    
    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let total = 0;
      let count = 0; // total items count

      cart.forEach(item => {
      total += item.price * item.quantity;
      count += item.quantity; // add quantity to count

      const div = document.createElement("div");
      div.className = "cart-item";
      div.style.marginBottom = "1.5rem";
      div.innerHTML = `
        <span>${item.title.substring(0, 25)}</span>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });



      
        cartTotalEl.textContent = total.toFixed(2);



    
      const cartValueEl = document.getElementById("value");
      cartValueEl.textContent = count;
    }



    
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }



      function toggleSection() {
        var section = document.getElementById('mySection');


        if (section.style.display === 'none') {
            section.style.display = 'block';

        } else {
            section.style.display = 'none';
        }   
}



