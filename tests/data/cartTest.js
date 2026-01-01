import {cart} from '../../data/cart.js';
describe('test suite: tests for addToCart',() => {
    beforeEach(() => {
        spyOn(localStorage,'setItem');
    });
    it('adds existing products to the cart',() => {
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'
            }]);
        });
        cart.loadFromStorage();
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:2,
            deliveryOptionId:'1'
        }]));
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
    });
    it('adds new product to the cart',() => {
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromStorage();
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
        }]));
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);
    })
});
describe('test suite: tests for removeFromCart()',() => {
    beforeEach(() => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'
            }]);
        });
        cart.loadFromStorage();
    });
    it('remove a productId that is in the cart',() => {
        cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
    });
    it('remove a productId that is not in the cart',() => {
        cart.removeFromCart('1');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:1,
            deliveryOptionId:'1'
        }]));
    });
});
describe('test suite: tests for updateDeliveryOption()',() => {
    beforeEach(() => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'
            }]);
        });
        cart.loadFromStorage();
    });
    it('update the delivery option',() => {
        cart.updateDeliveryOptionId('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:1,
            deliveryOptionId:'3'
        }]));
    });
    it('calling updateDeliveryOptionId with a new productId',() => {
        cart.updateDeliveryOptionId('150107','1');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    it('calling updateDeliveryOptionId with a invalid deliveryOptionId',() => {
        cart.updateDeliveryOptionId('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','4');
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});