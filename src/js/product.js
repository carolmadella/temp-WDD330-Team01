import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";

function addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart") || [];

    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }
    const existingItemIndex = cartItems.findIndex(
        (item) => item.Id === product.Id
    );

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
    alert(`${product.Name} added to cart.`);
}

document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);

const productId = getParam("product");
productDetails(productId);
