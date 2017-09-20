@MobileCompleted
Feature: E-commerce E2E Scenarios


  Background:
    When  Set the application type as non-angular
    Given Launch Sample e-commerce application
    And   Click on My Account link available on right corner

   #  E2E Testing
  Scenario Outline: Adding new item to cart and placing order


    And   Login to application with valid credentials
    And   Wait until login to the application
    And   Navigate to the iPhones category
    Then  Add <product> product to cart
    And   Click on go to check out option
    Then  The item <product> should display under cart list
    Examples:
      | product     |
      | Magic Mouse |