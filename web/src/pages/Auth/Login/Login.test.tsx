import { render } from "@testing-library/react";
import { ApiClientProvider } from "../../../provider/apiClientProvider";
import { CurrentUserContext } from "../../../provider/userProvider";
import { Client } from "../../../utils/Client";
import { Login } from "./Login";

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("../../../utils/Client", () => {
  const mockClient = {
    getAuthToken: jest.fn(),
    tranformOptions: jest.fn(),
    AuthLogin: jest.fn(),
    SignIn: jest.fn(),
    getProjects: jest.fn(),
    addProject: jest.fn(),
    removeProject: jest.fn(),
    editProject: jest.fn(),
    getTasksByProject: jest.fn(),
    getTask: jest.fn(),
    createTask: jest.fn(),
    editTask: jest.fn(),
    deleteTask: jest.fn(),
    getNotesByProject: jest.fn(),
    createNote: jest.fn(),
    getNote: jest.fn(),
    editNote: jest.fn(),
    deleteNote: jest.fn(),
    getProject: jest.fn(),
  };

  return jest.fn(() => mockClient);
});

const mockCurrentUserContext = {
  currentUser: null,
  setCurrentUser: jest.fn(),
};

const mockApiClientContext = {
  apiClient: new Client(),
};

const mockUseHistory = {
  push: jest.fn(),
};

const mockUseForm = {
  control: jest.fn(),
  handleSubmit: jest.fn(),
};

describe("<Login />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const login = render(
      <ApiClientProvider>
        <CurrentUserContext.Provider value={mockCurrentUserContext}>
          <Login />
        </CurrentUserContext.Provider>
      </ApiClientProvider>
    );
  });

  it("the component should rendered", () => {
    const login = 1;

    expect(login).toBeTruthy();
  });
});
