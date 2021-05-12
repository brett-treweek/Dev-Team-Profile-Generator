const Manager = require('../lib/Manager');

describe('Manager', () => {

    it('Can set Office Number with argument', () => {
        const manager = new Manager('Brett','01', 'brett@gmail.com', 'Manager', '999');
        expect(manager.officeNumber).toBe('999');
    });

    it('will return Office number when getNumber method is invoked', () => {
        const manager = new Manager('Brett','01', 'brett@gmail.com', 'Manager', '999');
        expect(manager.getNumber()).toBe('999');
    });

});