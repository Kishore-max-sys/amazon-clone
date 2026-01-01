import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export class DeliveryOptions{
    id;
    deliveryDays;
    priceCents;
    constructor(deliveryOptionDetails){
        this.id=deliveryOptionDetails.id;
        this.deliveryDays=deliveryOptionDetails.deliveryDays;
        this.priceCents=deliveryOptionDetails.priceCents;
    }
}
export const deliveryOptions=[{
    id:'1',
    deliveryDays:7,
    priceCents:0
},{
    id:'2',
    deliveryDays:3,
    priceCents:499
},{
    id:'3',
    deliveryDays:1,
    priceCents:999
}].map((option) => {
    return new DeliveryOptions(option);
});
export function getDeliveryOption(cartItem){
    let matchingOption;
    deliveryOptions.forEach((option) => {
    if(cartItem.deliveryOptionId===option.id){
        matchingOption=option;
    }
    });
    return matchingOption;
}
export function calculateDeliveryDate(option){
    const today=dayjs();
    let deliveryDay=today.add(option.deliveryDays,'days');
    let day=deliveryDay.format('dddd');
    while(day==='Saturday' || day==='Sunday'){
        option.deliveryDays+=1;
        deliveryDay=today.add(option.deliveryDays,'days');
        day=deliveryDay.format('dddd');
    }
    const formattedDate=deliveryDay.format('dddd, MMMM D');
    return formattedDate;
}