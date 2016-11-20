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
      flash[:notice] = @task.errors.full_messages.join(',')
      render json: { errors: @task.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @task = Task.find(params[:task][:task_id])
    @task.destroy
    # system "git branch -d #{@task.body}"
  end

  def update
    @task = Task.find(params[:task][:task_id])
    if @task.update_attributes(body: params[:task][:body])
      render json: { task: @task }, status: :ok
    else
      flash[:notice] = @task.errors.full_messages.join(',')
    end
  end

  def commit
    @task = Task.find(params[:task_id])
    task_name = "#{@task.body}"
    system "git add -A"
    system "git commit -m ""#{task_name}"
  end

  def pullrequest
    system "git push origin head"
  end

  private
  def task_params
    params.require(:task).permit(:body, :project_id)
  end
end
