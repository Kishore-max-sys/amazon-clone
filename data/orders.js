export let orders=JSON.parse(localStorage.getItem('orders'))||[];
export function addOrder(order){
    orders.unshift(order); // adds element at the first
    saveToStorage();
}
function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}