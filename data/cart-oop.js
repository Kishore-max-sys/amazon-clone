function Cart(localStorageKey){
    const cart={
        cartItems: undefined,
        loadFromStorage(){
            cart.cartItems=JSON.parse(localStorage.getItem(localStorageKey));
            if(!cart.cartItems){
                cart.cartItems=[{
                    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity:2,
                    deliveryOptionId:'1'
                },
                {
                    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity:1,
                    deliveryOptionId:'2'
                }
                ];
            }
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(cart.cartItems));
        },
        addToCart(productId){
            let matchingItem;
            const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
            const quantitySelectorValue=quantitySelector ? Number(quantitySelector.value) : 1;
            cart.cartItems.forEach((cartItem) => {
                if(cartItem.productId === productId){
                    cartItem.quantity+=quantitySelectorValue;
                    matchingItem=cartItem.productId;
                }
            });
            if(!matchingItem){
                cart.cartItems.push({
                    productId : productId,
                    quantity : quantitySelectorValue
                });
            }
            cart.saveToStorage();
        },
        removeFromCart(productId,totalQuantity){
            const newCart=[];
            cart.cartItems.forEach((cartItem) => {
                if(cartItem.productId!==productId){
                    newCart.push(cartItem);
                }
                else{
                    totalQuantity-=cartItem.quantity;
                }
            });
            cart.cartItems=newCart;
            saveToStorage();
        },
        updateQuantity(productId,newQuantity){
            cart.forEach((cartItem) => {
                if(cartItem.productId===productId){
                    cartItem.quantity=newQuantity;
                    console.log(cartItem.quantity);
                }
            });
            saveToStorage();
        },
        updateDeliveryOptionId(productId,deliveryOptionId){
            let matchingItem;
            let isFound=false;
            cart.cartItems.forEach((cartItem) => {
                if(cartItem.productId===productId){
                    matchingItem=cartItem;
                    isFound=true;
                }
            });
            if(!isFound){
                return;
            }
            if(deliveryOptionId=='1'||deliveryOptionId=='2'||deliveryOptionId=='3'){
                matchingItem.deliveryOptionId=deliveryOptionId;
                saveToStorage();
            }
            return;
        },
        calculateQuantity(){
            let totalQuantity=0;
            cart.cartItems.forEach((cartItem) => {
                totalQuantity+=cartItem.quantity;
            });
            localStorage.setItem('totalQuantity',JSON.stringify(totalQuantity));
            return totalQuantity;
        }
    }
    return cart;
}
const cart=Cart('cart-oop');
const bussinessCart=Cart('cart-bussiness');
cart.loadFromStorage();
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
bussinessCart.loadFromStorage();
console.log(cart);
console.log(bussinessCart);