import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import CreateContent from "../components/CreateContent";
import { fetchThemes, fetchCategories, createContent } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock the services and hooks
vi.mock("../services/api", () => ({
  fetchThemes: vi.fn(),
  fetchCategories: vi.fn(),
  createContent: vi.fn(),
}));

vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("window", () => ({
  confirm: vi.fn(() => true), // Replace with desired return value (true/false)
}));

describe("CreateContent", () => {
  const mockThemes = [
    {
      _id: "1",
      name: "Theme1",
      allowsImages: true,
      allowsTexts: false,
      allowsVideos: false,
    },
    {
      _id: "2",
      name: "Theme2",
      allowsImages: false,
      allowsTexts: true,
      allowsVideos: true,
    },
  ];
  const mockCategories = [
    { _id: "1", name: "Image Category", type: "image" },
    { _id: "2", name: "Text Category", type: "text" },
    { _id: "3", name: "Video Category", type: "video" },
  ];
  const mockUser = { _id: "user1" };
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (fetchThemes as Mock).mockResolvedValue(mockThemes);
    (fetchCategories as Mock).mockResolvedValue(mockCategories);
    (useAuth as Mock).mockReturnValue({ user: mockUser });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders create content form", async () => {
    render(<CreateContent />);

    expect(
      await screen.findByRole("heading", { name: "Create Content" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What describes your content...")
    ).toBeInTheDocument();
    fireEvent.submit(screen.getByRole("button", { name: "Create Content" }));
  });

  test("filters categories based on theme selection", async () => {
    render(<CreateContent />);

    fireEvent.change(await screen.findByPlaceholderText("Title"), {
      target: { value: "New Content" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("What describes your content..."),
      { target: { value: "Description" } }
    );
    fireEvent.change(screen.getByLabelText("Select the theme of the content"), {
      target: { value: "1" },
    });
    await waitFor(() => {
      expect(screen.getByText("Image Category")).toBeInTheDocument();
      expect(screen.queryByText("Text Category")).toBeNull();
      expect(screen.queryByText("Video Category")).toBeNull();
    });
  });

  test("submits the form and navigates to the homepage", async () => {
    render(<CreateContent />);

    const confirmSpy = vi.spyOn(window, 'confirm'); // Spy on window.confirm
  

    fireEvent.change(await screen.findByPlaceholderText("Title"), {
      target: { value: "New Content" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("What describes your content..."),
      { target: { value: "Description" } }
    );
    fireEvent.change(screen.getByLabelText("Select the theme of the content"), {
      target: { value: "1" },
    });
    fireEvent.change(
      screen.getByLabelText("Select the category of the content"),
      { target: { value: "1" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Content URL or text"), {
      target: { value: "http://testcontent.com" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Create Content" }));

    expect(await createContent).toHaveBeenCalledWith({
      title: "New Content",
      description: "Description",
      theme: "1",
      category: "1",
      content: "http://testcontent.com",
      createdBy: mockUser._id,
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "Content saved! Do you want to return to the homepage ?"
    ); 
  });
});
