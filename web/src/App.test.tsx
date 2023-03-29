import { render } from "@testing-library/react";
import { TaskItem } from "./components/TaskItem/TaskItem";

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    projectId: "123",
  }),
}));

const mockTask = {
  id: 1,
  title: "Mocked task",
  isDone: false,
  description: "",
  children: [],
  project: undefined,
};
const mockEditable = false;

const mockCompletTask = jest.fn();
const mockdeleteTask = jest.fn();
const mockEditTask = jest.fn();

describe("<TaskItem />", () => {
  it("Should render the component", () => {
    // arrange
    const projectId = "123";

    // Mock the useParams hook to return the desired parameter value
    // useParams.mockReturnValue({ projectId });

    // act

    const taskItem = render(
      <TaskItem
        task={mockTask}
        editable={mockEditable}
        completeTask={mockCompletTask}
        deleteTask={mockdeleteTask}
        editTask={mockEditTask}
      />
    );

    //assert
    expect(taskItem).toBeTruthy();
  });
});
