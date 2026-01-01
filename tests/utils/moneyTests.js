import {formatCurrency} from '../../scripts/utils/money.js';
describe('test suite: test cases for formatCurrency', () => {
    it('converts cents to dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('works with negative values', () => {
        expect(formatCurrency(-500)).toEqual('-5.00');
    })
    describe('rounds to the nearest cents', () => {
        it('round to the next cent', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01');
        });
        it('round to the previous cent', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00');
        });
    });
});