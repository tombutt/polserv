require 'rest-client'


Given(/^I know the uri to call$/) do
@uri ="http://localhost:8888/feedzilla/categories"
end

When(/^I send a GET request$/) do
 @response= RestClient::get(@uri, :accept=>'application/json')
 @status=@response.code
end

Then(/^I GET a (\d+) response$/) do |arg1|  
  expect(@status).to eq(arg1.to_i)
  @status==arg1
end

