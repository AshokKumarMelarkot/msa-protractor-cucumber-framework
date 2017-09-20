@MobileCompleted
Feature: E-commerce Layout Scenarios


  Background:
    When  Set the application type as non-angular
    Given Launch Sample e-commerce application
    And   Click on My Account link available on right corner
    And   Login to application with valid credentials
    And   Wait until login to the application

    #  Layout Check :
    #    Checking the labels
    #    Checking the positions of elements
    #    Checking the alignment of elements
    #    Checking the colors of elements

  Scenario Outline: Check the labels and heading displayed on Allergy screen on mobile

    Then  The current screen should contain heading <heading>

    Examples:
      | heading      |
      | ONLINE STORE |


    #  StaticData Check :
    #    Checking the Dropdown values
    #    Checking List box values
    #    Checking Message templates


  Scenario: Check the dropdown list of values displayed for product category

    Then  The following values should display under product category dropdown
      | app.product.category.Accessories |
      | app.product.category.iMacs       |
      | app.product.category.iPads       |
      | app.product.category.iPhones     |
      | app.product.category.iPods       |
      | app.product.category.MacBooks    |



