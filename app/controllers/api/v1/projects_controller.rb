class Api::V1::ProjectsController < ApiController
  def index
    @projects = Project.all
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
  end

  def destroy
  end

  private
  def project_params
    params.require(:project).permit(:title)
  end
end
