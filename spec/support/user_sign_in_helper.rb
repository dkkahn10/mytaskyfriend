module UserSignInHelper
  def login_with_facebook(username = "foobington")
    visit auth_path(:facebook)
    fill_in :user_name, with: username
    click_on "Create User"
  end
end
