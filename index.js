document.addEventListener("DOMContentLoaded", getProducts);
const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const overlay = document.getElementById("overlay");

const searchInput = document.getElementById("searchInput");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".icon-cart");

let productsDisplayed = [];
let cart = {};

searchInput.addEventListener("input", searchProducts);
cartButton.addEventListener("click", toggleCartPopup);

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    productsDisplayed = data;
    displayProducts(productsDisplayed);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = ""; // Clear previous content

  products.forEach((product) => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
}

function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const imageElement = document.createElement("img");
  imageElement.src = product.image;
  imageElement.alt = product.title;

  const nameElement = document.createElement("h3");
  nameElement.textContent = product.title;

  const priceElement = document.createElement("p");
  priceElement.textContent = 'price:  $'+(product.price);

  const addToCartButtonElement = document.createElement("button");
  addToCartButtonElement.textContent = "Add to Cart";
  addToCartButtonElement.addEventListener("click", () => addToCart(product));

  productElement.appendChild(imageElement);
  productElement.appendChild(nameElement);
  productElement.appendChild(priceElement);
  productElement.appendChild(addToCartButtonElement);

  return productElement;
}


function searchProducts(event) {
  const searchTerm = event.target.value.toLowerCase(); // Get search term and convert to lowercase

  // Filter products based on search term
  const filteredProducts = productsDisplayed.filter((product) => {
    const productName = product.title.toLowerCase();
    return productName.includes(searchTerm); // Check if product name includes search term
  });

  // Update displayed products
  displayProducts(filteredProducts);
}

function addToCart(product) {
  // Check if the product already exists in the cart
  if (cart[product.id]) {
    cart[product.id].quantity++; // Increase quantity if it already exists
  } else {
    cart[product.id] = { ...product, quantity: 1 }; // Add new product with quantity 1
  }

  // Update cart count display
  cartCount.textContent = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  // (Optional) You can add logic here to display a cart update message or trigger a cart popup update
  alert("added to cart!!!");
}

