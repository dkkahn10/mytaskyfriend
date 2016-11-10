class Api::V1::TasksController < ApiController
  # def index
  #   @project = Project.find(params[:projectId])
  #   @tasks = @project.tasks
  #   render json: {
  #     tasks: @tasks
  #   }, status: :ok
  # end

  def show
    @project = Project.find(params[:id])
    @tasks = @project.tasks
    render json: {
      tasks: @tasks
    }, status: :ok
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    if @task.save
      render json: { task: @task }, status: :created
    else
      render json: { errors: @task.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    binding.pry
    @task = Task.find(params[:task][:task_id])
    @task.destroy
  end

  private
  def task_params
    params.require(:task).permit(:body, :project_id)
  end
end
