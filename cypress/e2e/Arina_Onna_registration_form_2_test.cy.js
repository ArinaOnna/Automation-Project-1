beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{ 
        
        cy.get('input#username.input').type('ArinaOnna');
        cy.get('input#email.input').type('arina@test.com');
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777');
        cy.get('[data-cy="name"]').type('Arina');
        cy.get('input#lastName.input').type('Onna');
        cy.get('input#password').type('Porgand27');
        cy.get('#confirm').type('Kapsas')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#confirm').clear()
        cy.get('#confirm').type('Porgand27')
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })


    it.only('User can submit form with all fields added', ()=>{

        cy.get('input#username.input').type('ArinaOnna');
        cy.get('input#email.input').type('arina@test.com');
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777');
        cy.get('[data-cy="name"]').type('Arina');
        cy.get('input#lastName.input').type('Onna');
        cy.get('input#password').type('Porgand27');
        cy.get('input#confirm').type('Porgand27');
        cy.get('#htmlFavLanguage').check();
        cy.get('#vehicle2').check();
        cy.get('#cars').select('volvo');
        cy.get('#animal').select('mouse');
        cy.get("h2").contains("Password").click();
        cy.get(".submit_button").should("be.enabled");
        cy.get(".submit_button").click();
        cy.get("#input_error_message").should("not.be.visible");
        cy.get("#password_error_message").should("have.css", "display", "none");
        cy.get("#success_message").should("be.visible");
        cy.get("#success_message").should("have.css", "display", "block");
    });

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{

        inputValidData('ArinaOnna')
        cy.get("h2").contains("Password").click();
        cy.get("button.submit_button").should("be.enabled").click();
        cy.get("#success_message").should("be.visible");
        cy.get("#success_message").should("have.css", "display", "block");
    });


    it('User can not submit form when some mandatory field is not present', ()=>{
       
        inputValidData('ArinaOnna')
        cy.get('input#email.input').scrollIntoView()
        cy.get('input#email.input').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get("#input_error_message")
        .should("be.visible")
        .should("contain", "Mandatory input field is not valid or empty!");
    })



/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    
    it('Check that logo is correct and has correct size', () => {
       
        cy.log('Will check logo source and size')
        cy.get('img')
        .should('have.attr', 'src')
        .should('include', 'cerebrum_hub_logo')
        cy.get('img')
        .invoke('height')
        .should('be.lessThan', 178)
        .and('be.greaterThan', 100)   
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        
        cy.log('Will check logo source and size')
        cy.get('img')
        .eq(1)
        .should('have.attr', 'src')
        .should('include', 'cypress_logo')
        cy.get('img')
        .eq(1)
        .invoke('height')
        .should('be.lessThan', 116)
        .and('be.greaterThan', 87) 

    });

    it('Check navigation to link Registration form 1', () => {
       
        cy.get('nav')
        .children()
        .should('have.length', 2)
        cy.get('nav')
        .siblings('h1')
        .should('have.text', 'Registration form number 2')
        cy.get('nav')
        .children()
        .eq(0)
        .should('be.visible')
        .and('have.attr', 'href', 'registration_form_1.html')
        .click()
        cy.url()
        .should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation to link Registration form 3', () => {
        
        cy.get('nav')
        .children()
        .should('have.length', 2)
         cy.get('nav')
        .siblings('h1')
        .should('have.text', 'Registration form number 2')
         cy.get('nav')
        .children()
        .eq(1)
        .should('be.visible')
        .and('have.attr', 'href', 'registration_form_3.html')
        .click()
        cy.url()
        .should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes list is correct', () => {
        
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })

    it('Car dropdown is correct', () => {
        
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Check that animal dropdown is correct', () => {
        
        cy.get('#animal')
        .select(3)
        .screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Animal dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal')
        .children()
        .should('have.length', 6)
    
        cy.get('#animal')
        .find('option')
        .then(options => {
        const actual = [...options]
        .map(option => option.value)
        expect(actual).to.deep
        .eq(['dog', 'cat','snake','hippo','cow','mouse'])
        })
    })
})


function inputValidData(ArinaOnna) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(ArinaOnna)
    cy.get('#email').type('arina@test.com')
    cy.get('[data-cy="name"]').type('Arina')
    cy.get('#lastName').type('Onna')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    cy.get('#password').type('Porgand27')
    cy.get('#confirm').type('Porgand27')
    cy.get('h2').contains('Password').click()
}