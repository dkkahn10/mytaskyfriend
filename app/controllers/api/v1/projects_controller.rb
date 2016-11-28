class Api::V1::ProjectsController < ApiController
  before_action :authenticate_user!, :current_user

  def index
    @projects = current_user.projects.order(created_at: :asc)

    render json: {
      projects: @projects
    }, status: :ok
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      admin = Role.find_by(name: "admin")
      Userproject.create(user: current_user, project: @project, role: admin)

      render json: { project: @project }, status: :created
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
      member = Role.find_by(name: "member")
      participant = User.find_by(username: params[:user][:username])
      Userproject.create(user: participant, project: @project, role: member)

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
