
export let cart=  JSON.parse(localStorage.getItem('cart'));

    if(!cart){
      cart=[{
        Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
    },
    {
      Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1
    }]
    }
    
    console.log(cart);

 export function addToCart(productId, selectedValue,inputValue=0){
            
  let matchingItem;
    cart.forEach((item)=>{
    if(item.Id===productId){
      matchingItem=item;      
    }
  })
  if(matchingItem){
    matchingItem.quantity=matchingItem.quantity+ selectedValue+inputValue;
  }
  else{
    cart.push({Id:productId,
      quantity:selectedValue+inputValue
      });
  }
  saveToLocalstorage();
 }
 export let updatedTotalQuantity;
 let cartQuantity;
 export  function updateCartQuantity(){
     let cartQuantity=0;
        console.log(cart);
        cart.forEach((item)=>{
          cartQuantity =cartQuantity+item.quantity;
        })
        console.log(cartQuantity);
        if(cartQuantity===0){
          cartQuantity='';
        }

        updatedTotalQuantity=cartQuantity;      
    }

 export   function saveToLocalstorage(){
      localStorage.setItem('cart',JSON.stringify(cart));
    }
   
   export function removeFromStorage(productId){
      
    const newCart=[];

      cart.forEach((cartItem)=>{
        if(cartItem.Id!==productId){
          newCart.push(cartItem)
        }})
        cart=newCart;
        saveToLocalstorage();         
    }


 
  

 






