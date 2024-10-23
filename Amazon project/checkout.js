
 import { products } from "./data/products.js";
 import { cart, removeFromStorage, saveToLocalstorage, updateCartQuantity } from "./cart.js";


 function calculateCartQuantity(){
  let cartQuantity=0;
  console.log(cart);
  cart.forEach((item)=>{
    cartQuantity =cartQuantity+item.quantity;
  })
  console.log(cartQuantity);

  return cartQuantity;
 }
 

let orderSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.Id;
  const productQuantity = cartItem.quantity;
  let matchingItem;

  // Find matching product by productId
  products.forEach((product) => {
    if (productId === product.id) {
      matchingItem = product;
    }
  });

  // Only proceed if a matching product is found
  if (matchingItem) {
    const cartItemTitle = matchingItem.name;
    const cartItemImage = matchingItem.image;
    const cartItemPrice = (matchingItem.priceCents / 100).toFixed(2); // Convert to dollars
    const html = `
      <div class="cart-item-container js-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${cartItemImage}">

          <div class="cart-item-details">
            <div class="product-name">
              ${cartItemTitle}
            </div>
            <div class="product-price">
              $${cartItemPrice}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${productQuantity}</span>
              </span>
              <span class="js-paragraph-${matchingItem.id}">
              
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-checkout" data-product-id="${matchingItem.id}" >
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append the HTML for each cart item
    orderSummaryHTML += html;
  }
});

  // Inject the constructed HTML into the DOM
  document.querySelector('.js-home-link').textContent=`items ${calculateCartQuantity()}`; 
  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;
  document.querySelectorAll('.js-delete-link').forEach((deletelink)=>{
    deletelink.addEventListener('click',()=>{
      const productId= deletelink.dataset.productId;
      console.log(productId);
      removeFromStorage(productId);
      console.log(cart);
      const container =document.querySelector(`.js-container-${productId}`);
      container.remove();
     
      document.querySelector('.js-home-link').textContent=`items ${calculateCartQuantity()}`;   
      })
    })

    // On clicking Update button, product quantity and cart quantity is updated
    
  document.querySelectorAll('.js-update-quantity-checkout').forEach((updateButton)=>{
    //let inputtedValue;

    //console.log here first
      updateButton.addEventListener('click',()=>{
        let inputtedValue;
        console.log('clicked');
        const productId= updateButton.dataset.productId;

        const paragraphElement= document.querySelector(`.js-paragraph-${productId}`);

        paragraphElement.classList.remove("hidden");
      paragraphElement.innerHTML=`
      <input type="text" class="js-input-${productId}">
  <button class="js-savebutton-${productId}"> Save</button> 
      ` 
      document.querySelector(`.js-savebutton-${productId}`).addEventListener('click',()=>{
        const inputElement= document.querySelector(`.js-input-${productId}`);
        const inputValue= parseInt(inputElement.value);
        console.log(inputValue);


    //console.log inputtedValue second;

        console.log(`Inputted Value second:${inputtedValue}`);
        cart.forEach(cartItem => {
          if(cartItem.Id===productId){
            const newQuantity=inputValue;
            cartItem.quantity=newQuantity;
            inputtedValue=newQuantity;

             //console.log inputtedValue third;

            console.log(`Inputted Value third:${inputtedValue}`)
          }   
        });
        saveToLocalstorage();
          paragraphElement.classList.add("hidden");
  console.log(cart);
  console.log(calculateCartQuantity());
  document.querySelector('.js-home-link').textContent=`items ${calculateCartQuantity()}`; 
  document.querySelector(`.js-quantity-label-${productId}`).innerHTML=`${inputtedValue}`;

  // console.log last

  console.log(`Inputted Value at last:${inputtedValue}`);
          });          
           });          
             });


  
    

   





