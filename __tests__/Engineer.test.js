const Engineer = require('../lib/Engineer');

describe('Engineer', () => {

    it('Can set GitHub username with argument', () => {
        const engineer = new Engineer('Brett','01', 'brett@gmail.com', 'Engineer', 'brett-github');
        expect(engineer.gitHub).toBe('brett-github')
    });

    it('will return GitHub username when getGithub method is invoked', () => {
        const engineer = new Engineer('Brett','01', 'brett@gmail.com', 'Engineer', 'brett-github');
        expect(engineer.getGitHub()).toBe('brett-github')
    })

})