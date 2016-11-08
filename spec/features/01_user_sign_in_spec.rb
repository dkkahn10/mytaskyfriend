describe "access top page" do
  # let(:user2) { FactoryGirl.create(:user) }

  it "can sign in user with Facebook account" do
    username = "testuser"
    visit '/'
    expect(page).to have_content("Sign in with Facebook")
    login_with_facebook(username)
    expect(page).to have_content(username)
    expect(page).to have_content("Sign Out")
  end

  it "can handle authentication error" do
    OmniAuth.config.mock_auth[:facebook] = :invalid_credentials
    visit '/'
    expect(page).to have_content("Sign in with Facebook")
    click_link "Facebook"
    expect(page).to have_content('Authentication failed.')
  end
end
