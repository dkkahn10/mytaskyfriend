class Api::V1::ProjectsController < ApiController
  before_action :authenticate_user!, :current_user

  def index
    @projects = Project.all
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
    if @project.save
      render json: { project: @project }, status: :created
    else
      render json: { errors: @project.errors }, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private
  def project_params
    params.require(:project).permit(:title)
  end
end
