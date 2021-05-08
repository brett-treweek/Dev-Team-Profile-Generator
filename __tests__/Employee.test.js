const Employee = require('../lib/Employee')

describe('Employee', () => {
    it('Throws an error if no value is given', () => {
        expect(() => {
            new Employee();
        }).toThrow('Please provide a Name, ID and Email')
    })

})