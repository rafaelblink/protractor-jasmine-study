var fs = require("fs");

describe("Meus testes:", function(){

    const email = element(by.id('inputEmail'));
    const pass = element(by.id('inputPassword'));
    const btnLogin = element(by.tagName('button'));
    const linkPacientes = element(by.linkText('Pacientes'))

    beforeEach(function() {
        browser.get('http://localhost:4200/');
    });
    
    it('Testando quantidade de pacientes', () => {
        email.sendKeys('email_a@email.com');
        pass.sendKeys('123');
        browser.sleep(3000);
        btnLogin.click();
        browser.sleep(3000);
        linkPacientes.click();
        browser.sleep(3000);
        const tabledata = element.all(by.tagName("tbody"));
        const rows = tabledata.all(by.tagName("tr"));
        rows.each(row => {
            row.getText().then(text => {
                let newText = text.split('Ações').join('');
                newText = newText.split('ID Nome RG').join('ID Nome RG\n');
                fs.readFile("data.txt", "utf-8", (err, data) => {
                    data += newText.split();
                    fs.writeFile("data.txt", data, (err) => {
                        if (err) console.log(err);
                     });
                });
            });
        });
        rows.count().then((text) => {
            console.log(`---------  Existem ${text} pacientes na base de dados! ---------`);
        });
        browser.sleep(3000);
        expect(rows.count()).toBeGreaterThanOrEqual(6, 'É necessário ter 10 ou mais pacientes!');
    });
 });