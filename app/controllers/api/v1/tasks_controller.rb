class Api::V1::TasksController < ApiController
  def index
    @tasks = Task.all
    render json: {
      tasks: tasks
    }, status: :ok
  end
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
  end

  private
  def task_params
    params.require(:task).permit(:body)
  end
end
