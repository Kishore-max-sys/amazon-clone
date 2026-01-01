import {Product,Clothing} from '../../data/products.js';
import {DeliveryOptions} from '../../data/deliveryOptions.js';
describe('test suite: Product',() => {
    it('tests for Product class', () => {
        const product = new Product({
            id:'2',
            name:'football',
            priceCents:78.98
        });
        expect(product.id).toEqual('2');
        expect(product.name).toEqual('football');
        expect(product.priceCents).toEqual(78.98);
    });
    it('tests for Clothing class',() => {
        const cloth=new Clothing({
            id:'3',
            sizeChartLink:'link'
        });
        expect(cloth.sizeChartLink).toEqual('link');
    });
});
describe('test suite: deliveryOption',() => {
    it('tests for DeliveryOptions class',() => {
        const deliveryOption=new DeliveryOptions({
            id:'1',
            deliveryDays:7,
            priceCents:45
        });
        expect(deliveryOption.id).toEqual('1');
        expect(deliveryOption.deliveryDays).toEqual(7);
        expect(deliveryOption.priceCents).toEqual(45);
    });
});