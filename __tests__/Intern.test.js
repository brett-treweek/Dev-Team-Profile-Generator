const Intern = require('../lib/Intern');

describe('Intern', () => {

    it('Can set School with argument', () => {
        const intern = new Intern('Brett','01', 'brett@gmail.com', 'Intern', 'UWA');
        expect(intern.school).toBe('UWA')
    });

    it('will return School when getSchool method is invoked', () => {
        const intern = new Intern('Brett','01', 'brett@gmail.com', 'Intern', 'UWA');
        expect(intern.getSchool()).toBe('UWA')
    })

})