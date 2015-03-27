Feature: just testing some rest calls

Scenario: attempt to make a rest call
Given I know the uri to call
When I send a GET request
Then I GET a 200 response
