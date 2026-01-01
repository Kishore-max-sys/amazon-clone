class Cart{
    cartItems;
    #localStorageKey;
    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }
    #loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems=[{
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
    }
    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }
    addToCart(productId){
        let matchingItem;
        const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
        const quantitySelectorValue=quantitySelector ? Number(quantitySelector.value) : 1;
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId){
                cartItem.quantity+=quantitySelectorValue;
                matchingItem=cartItem.productId;
            }
        });
        if(!matchingItem){
            this.cartItems.push({
                productId : productId,
                quantity : quantitySelectorValue
            });
        }
        this.saveToStorage();
    }
    removeFromCart(productId,totalQuantity){
        const newCart=[];
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId!==productId){
                newCart.push(cartItem);
            }
            else{
                totalQuantity-=cartItem.quantity;
            }
        });
        this.cartItems=newCart;
        this.saveToStorage();
    }
    updateQuantity(productId,newQuantity){
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId===productId){
                cartItem.quantity=newQuantity;
                console.log(cartItem.quantity);
            }
        });
        this.saveToStorage();
    }
    updateDeliveryOptionId(productId,deliveryOptionId){
        let matchingItem;
        let isFound=false;
        this.cartItems.forEach((cartItem) => {
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
            this.saveToStorage();
        }
        return;
    }
    calculateQuantity(){
        let totalQuantity=0;
        this.cartItems.forEach((cartItem) => {
            totalQuantity+=cartItem.quantity;
        });
        localStorage.setItem('totalQuantity',JSON.stringify(totalQuantity));
        return totalQuantity;
    }
}
const cart=new Cart('cart-oop');
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
const bussinessCart=new Cart('cart-bussiness');
console.log(cart);
console.log(bussinessCart);