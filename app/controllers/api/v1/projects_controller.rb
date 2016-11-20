class Api::V1::ProjectsController < ApiController
  before_action :authenticate_user!, :current_user

  def index
    @projects = Project.all
    render json: {
      projects: @projects
    }, status: :ok
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
    if @project.save
      render json: { project: @project }, status: :created
      # branch_name = project_params["title"].gsub(" ", "_")
      # system "git branch #{branch_name}"
      # system "git checkout #{branch_name}"
    else
      flash[:notice] = @project.errors.full_messages.join(',')
      render json: { errors: @project.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @project = Project.find(params[:project][:project_id])
    @project.destroy
  end

  def update
    @project = Project.find(params[:project][:project_id])
    if @project.update_attributes(title: params[:project][:title], color: params[:project][:color])
      render json: { project: @project }, status: :ok
    else
      flash[:notice] = @project.errors.full_messages.join(',')
    end
  end

  private
  def project_params
    params.require(:project).permit(:title, :color)
  end
end
