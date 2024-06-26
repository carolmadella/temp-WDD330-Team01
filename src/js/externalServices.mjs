const baseURL = '/api'; // This assumes that your proxy in vite.config.js is configured to forward /api requests


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category) {

  const response = await fetch(`${baseURL}/products/search/${category}`);

  console.log("RESPONSE:", response)

  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(`${baseURL}/product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}
export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(`${baseURL}/checkout/`, options).then(convertToJson);
}
