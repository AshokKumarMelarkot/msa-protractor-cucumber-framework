@MobileCompleted
Feature: E-commerce Functional Scenarios


  Background:
    When  Set the application type as non-angular
    Given Launch Sample e-commerce application

    #  ErrorValidation Check :
    #    Checking validations for fields / Mandatory check
    #    Boundary value analysis

  Scenario Outline: Check the validation message when enter wrong credentials

    When  User already logged in then log out from application
    And   Click on My Account link available on right corner
    And   Login to portal account with user <uname> and password <password>
    Then  Should display <validationMessage> on login screen
    Examples:
      | uname   | password | validationMessage                 |
      | msashok | password | ERROR: Invalid login credentials. |



    #  Functionality Check :
    #    Save functionality
    #    Edit functionality
    #    Delete functionality
    #    Filter,Sort,Search
    #    Checking the behaviour of the fields
    #    Equivalent partitioning

  @MobileCompleted
  Scenario Outline: Adding new item to cart

    And   Click on My Account link available on right corner
    And   Login to application with valid credentials
    And   Wait until login to the application
    And   Navigate to the iPhones category
    Then  Add <product> product to cart
    And   Click on go to check out option
    Then  The item <product> should display under cart list
    Examples:
      | product     |
      | Magic Mouse |
