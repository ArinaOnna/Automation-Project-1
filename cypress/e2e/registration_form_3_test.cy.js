import 'cypress-file-upload';

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


describe('Section1: Visual tests', () => {

    /*
BONUS TASK: add visual tests for registration form 3
Task list:
* 
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkbCreate test suite for visual tests for registration form 3 (describe block)oxes, their content and links
    * email format
 */
    
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img')
        .should('have.attr', 'src')
        .should('include', 'cerebrum_hub_logo')
        cy.get('img')
        .invoke('height')
        .should('be.lessThan', 170)
        .and('be.greaterThan', 160)
    });
    });

    it('Check that radio button list is correct', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should('have.length', 4)

    // Verify labels of the radio buttons
    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    cy.get('input[type="radio"]').eq(2).should('not.be.checked')
    cy.get('input[type="radio"]').eq(3).should('not.be.checked')

    // Selecting one will remove selection from the other radio button
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });

    it('Should verify that the list of cities changes depending on the choice of country', () => {
    
    // Select a country and verify the city options
    cy.get('#country').select('Spain');
    
    // Verify the options for the city dropdown
    cy.get('#city').children().should('have.length', 5)
    cy.get('#city')
        .find('option')
        .then((options) => {
        const actual = [...options].map((option) => option.text)
        expect(actual).to.deep.eq(["",'Malaga', 'Madrid', 'Valencia', 'Corralejo']);

    // Verify that list of cities changes depending on the choice of country
    cy.get('#country').select('Estonia');
    // Check  that second element in the dropdown has text Tallinn
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    // Select city Haapsalu
    cy.get('#city').select('Haapsalu');
    cy.get('#city').should('contain', 'Haapsalu');

     // Change country to Spain
     cy.get('#country').select('Spain');
     // Verify that city Haapsalu is removed
     cy.get('#city').find('option').should('not.contain','Haapsalu')
    
    });
    });
    it('should verify the presence of checkboxes', () => {
    // Check if the first checkbox is present
    cy.get('input[ng-model="checkbox"]').should('exist');
    
    // Check if the second checkbox is present and the link is correct
    cy.get('input[type="checkbox"]').should('exist');
  
    // Check the first checkbox
    cy.get('input[ng-model="checkbox"]').check().should('be.checked');
    
    // Uncheck the first checkbox
    cy.get('input[ng-model="checkbox"]').uncheck().should('not.be.checked');
    
    // Check the second checkbox
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked');
    
    // Uncheck the second checkbox
    cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked');
  
    // Check that first box has text "Accept our privacy policy" and the second one "Accept our cookie policy"
    cy.get('.w3-cell-row').prev('div').should('contain','Accept our privacy policy')
    cy.get('input[type="checkbox"]').next().eq(1).should('have.text','Accept our cookie policy')
    
    // Attempt to submit the form without checking the checkboxes
    cy.get('form').submit();
    cy.go('back').url().should('contain', '/registration_form_3.html')
    
    // Verify that it's possible to submit form when both checkboxes are checked
    // Check both checkboxes
    cy.get('input[ng-model="checkbox"]').check();
    cy.get('input[type="checkbox"]').eq(1).check();

    // Submit the form
    cy.get("form").submit(); 
    cy.go('back').url().should('contain', '/registration_form_3.html')       
    });


    it('Tests for Email input field', () => {
    // Check if the email input field is present
    cy.get('input[name="email"]').should('exist');
     // Type a valid email address
    cy.get('input[name="email"]').type('arina@test.com');
    // Assert that the input value is correct
    cy.get('input[name="email"]').should('have.value', 'arina@test.com');
    // Clear input field
    cy.get('input[name="email"]').clear();
    // Type an invalid email address
    cy.get('input[name="email"]').type('arina.test.com');
    // Check for validation error message or invalid class
    cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]')
      .should('be.visible')
      .and('contain', 'Invalid email address');
    // Assert that there is a required field error when input field left empty
    // Make sure the field is empty
    cy.get('input[name="email"]').clear();
    // Check for required field validation error
    cy.get('#emailAlert span[ng-show="myForm.email.$error.required"]')
    .should('be.visible')
    .and('contain', 'Email is required');

     });

    

    // BIRTHDAY variable and function:
  const randomBirthday = getRandomBirthday(1, 100); // Random birthday for someone between 1 and 100 years old
  console.log(randomBirthday)

    function getRandomBirthday(minAge, maxAge) {
    const today = new Date()
    const currentYear = today.getFullYear()
    const randomYear = currentYear - Math.floor(Math.random() * (maxAge - minAge + 1) + minAge)
    const randomMonth = Math.floor(Math.random() * 12)
    const randomDay = Math.floor(Math.random() * (new Date(randomYear, randomMonth + 1, 0).getDate())) + 1
    const randomBirthday = new Date(randomYear, randomMonth, randomDay)
    const formattedBirthday = randomBirthday.toISOString().split("T")[0]
    return formattedBirthday;
  }



  describe('Section2: Functional tests', () => {

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

    it('User can submit form with all fields valid', () => {
        
        cy.get("#name").type('Arina Onna');
        cy.get('input[name="email"]').type('arina@test.com');
        cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]').should('not.be.visible');
        cy.get("#emailAlert").should('not.be.visible');
        cy.get("#country").select('object:5').should('contain', 'Austria');
        cy.get('#city').select('Vienna').should('contain', 'Vienna');
        cy.get('input[type="date"]').first().type('2024-07-15');
        cy.get('input[type="radio"]').check('Monthly');
        cy.get("#birthday").type('1999-09-27');
        cy.get('input[type="checkbox"]').eq(0).check();
        cy.get('input[type="checkbox"]').eq(0).should('be.checked');
        cy.get('input[type="checkbox"]').eq(1).check();
        cy.get('input[type="checkbox"]').eq(1).should('be.checked');
        cy.get("#checkboxAlert").should('not.be.visible');



  });

    it('User fills only mandatory fields', () => {
        cy.get('#name').type('Arina Onna');
        cy.get('input[name="email"]').type('arina@test.com');
        cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]').should(
        'not.be.visible');
        cy.get('#emailAlert').should('not.be.visible');
        cy.get('#country').select('object:4').should('contain', 'Estonia');
        cy.get('#city').select('Tallinn').should('contain', 'Tallinn');
        cy.get('#birthday').type('1999-09-27');
        cy.get('input[type="checkbox"]').eq(0).check();
        cy.get('input[type="checkbox"]').eq(0).should('be.checked');
        cy.get('#checkboxAlert').should('not.be.visible');
        cy.get('input[type="submit"]').click();
        cy.go('back');
        cy.log('Back again in Registration form 3');
  });

    it("Mandatory fields are absent with corresponding assertions", () => {
         inputEmptyMandatoryFields();

    it.only("Check that Cypress logo is correct and has correct size", () => { KadiTest
            cy.log("Check Cypress logo source and size");
            cy.get('[data-cy="cypress_logo"]')
              .should("have.attr", "src")
              .should("include", "cypress_logo");
            cy.get('[data-cy="cypress_logo"]').invoke("height").should("equal", 88);
            cy.get('[data-cy="cypress_logo"]').invoke("width").should("equal", 116);
          });     
  });


  });

  function inputEmptyMandatoryFields() {
    cy.log('Leaving mandatory fields empty');
    cy.get('input[name="email"]').clear().type("a").clear().blur();
    cy.get('#name').clear().type("a").clear().blur();
  
    // Check if the email alert element is visible
    cy.get('div#emailAlert').should('be.visible');
  
    // Ensure the specific required email message is visible
    cy.get('div#emailAlert span[ng-show="myForm.email.$error.required"]')
      .should('be.visible')
      .and('contain', 'Email is required');
    cy.get('input[ng-model="checkbox"]').uncheck();
    cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
    cy.get('input[type="submit"]').should('be.disabled');
    cy.get('input[type="date"]').first().type('2024-07-16');

    
  }
  