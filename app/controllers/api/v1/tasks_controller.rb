class Api::V1::TasksController < ApiController
  def index
    @tasks = Task.all
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
  end

  def destroy
  end

  private
  def task_params
    params.require(:task).permit(:body)
  end
end
