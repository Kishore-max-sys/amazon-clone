import {cart} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOptions.js';

import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutheader.js';
export function renderOrderSummary(){
  renderCheckoutHeader();
  let cartSummaryHTML='';
  cart.cartItems.forEach((cartItem) => {
      const productId=cartItem.productId;
      const matchingProduct=getProduct(productId);
      const matchingOption=getDeliveryOption(cartItem);
      const formattedDate=calculateDeliveryDate(matchingOption);
      cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${formattedDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price js-product-price-${matchingProduct.id}">
                    ${matchingProduct.getPriceCents()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span data-product-id="${matchingProduct.id}" class="update-quantity-link link-primary js-update-quantity-link">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span data-product-id="${matchingProduct.id}" class="save-quantity-link link-primary js-save-quantity-link">
                      Save
                    </span>
                    <span data-product-quantity="${cartItem.quantity}" data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryDetailsHTML(matchingProduct,cartItem)}
                </div>
              </div>
            </div>
      `;
    });
  function deliveryDetailsHTML(matchingProduct,cartItem){
    let html='';
    deliveryOptions.forEach((option) => {
      const formattedDate=calculateDeliveryDate(option);
      const deliveryPrice=option.priceCents===0?'FREE':`${formatCurrency(option.priceCents)} -`;
      const isChecked=cartItem.deliveryOptionId===option.id;
      html+=
            `
              <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${option.id}"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${option.id}">
                <input type="radio"
                  ${isChecked?'checked':''}
                  class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${option.id}"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${formattedDate}
                  </div>
                  <div class="delivery-option-price">
                    $${deliveryPrice} Shipping
                  </div>
                </div>
              </div>
            `
    });
    return html;
  }
  cart.calculateQuantity();
  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        const productId=link.dataset.productId;
        cart.removeFromCart(productId);
        cart.calculateQuantity();
        renderPaymentSummary();
        renderOrderSummary();
      });
    });
  renderCheckoutHeader();
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId=link.dataset.productId;
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    });
  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId=link.dataset.productId;
        const inputQuantity=document.querySelector(`.js-quantity-input-${productId}`);
        const inputValue=Number(inputQuantity.value);
        if(inputValue<=0 && inputValue<=1000){
          alert('Quantity must be atleast 0 and less than 1000');
          const container=document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');
          return;
        }
        cart.updateQuantity(productId,inputValue);
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML=inputValue;
        cart.calculateQuantity();
        renderPaymentSummary();
        renderCheckoutHeader();
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
      });
    });
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click',() => {
        const {productId,deliveryOptionId}=element.dataset;
        cart.updateDeliveryOptionId(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}