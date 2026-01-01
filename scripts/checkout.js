import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
//import '../data/backend-practise.js';
//import '../data/cart-class.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCartFetch} from '../data/cart.js';

async function loadPage(){
    try{
        // throw 'error1';
        /* await loadProductsFetch();
        const value1=await new Promise((resolve,reject) => {
            // throw 'error2'; //for synchronous code.
            loadCart(() => {
               // reject('error2'); // for error in future or for asynchronous code.
                resolve('value2');
            });
            console.log(value1);
        }); */
        const value1=await Promise.all([
            loadCartFetch(),
            loadProductsFetch()
        ]);
    }
    catch(error){
        console.log('unexpected error.please try again.');
    }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        console.log('load products');
        resolve('value');
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/