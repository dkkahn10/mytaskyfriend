require 'rails_helper'

feature "create projects through API" do
  describe Api::V1::ProjectsController, type: :controller do

    describe 'POST /api/v1/projects' do
      username = "testuser2"
      project_title = 'New Project'
      it 'creates a new project if a valid title is provided' do
        visit "/"
        click_link "Facebook"
        fill_in :user_name, with: username
        # login_with_facebook(username)
        click_on "Submit"
        post :create, params: {project: {title: project_title}}
        binding.pry
        expect(response.status).to eq(204)

        res_body = JSON.parse(response.body)
        expect(res_body['project']['title']).to eq(project_title)
        expect(res_body['project']['id']).not_to be(nil)

        project = Project.first
        expect(project.user_id).to eq(user.id)
      end
    end
  end
end
