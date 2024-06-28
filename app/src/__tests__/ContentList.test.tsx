import {
  render,
  screen,
  fireEvent,
  waitFor,
  findAllByText,
} from "@testing-library/react";
import { vi, Mock } from "vitest";
import ContentList from "../components/ContentList";
import { fetchContents } from "../services/api";

// Mock the fetchContents function
vi.mock("../services/api", () => ({
  fetchContents: vi.fn(),
}));

describe("ContentList", () => {
  const mockContents = Array.from({ length: 20 }, (_, index) => {
    const type = index % 3 === 0 ? "video" : index % 3 === 1 ? "image" : "text";
    return {
      _id: `${index + 1}`,
      title: `Test Content ${index + 1}`,
      content:
        type === "text"
          ? `Lorem ipsum dolor sit amet, consectetur adipisicing elit
    . Dignissimos explicabo expedita
    , odio consequatur totam repellendus non nulla. Error id natus culpa obcaecati numquam voluptate a modi, dolore fugit. Voluptate tempore officia ipsam officiis veniam deleniti dignissimos vitae a accusantium hic excepturi eaque, consequatur ipsum, consequuntur praesentium. Fugiat accusantium tempore illum vitae aperiam quos suscipit unde excepturi illo quaerat cumque tenetur soluta veritatis vero veniam, nesciunt ipsum, quas minus, quasi quis eum! Id exercitationem recusandae eos natus illum perferendis. Fugit quam doloremque iste porro quos aspernatur. Vel, facilis doloremque. Neque doloremque culpa assumenda fuga qui laborum esse voluptas similique ab dolore, minima nihil quos sint temporibus iusto, consequatur labore voluptatum alias! Quibusdam aut laudantium fugit officiis repellendus! Tempore, dolorum voluptates? Nihil repellendus facilis incidunt obcaecati cum numquam unde laudantium magnam ab placeat itaque vitae voluptatem recusandae expedita, ex aliquam omnis adipisci nostrum autem beatae aperiam possimus veniam rerum! Repellat mollitia quo cum recusandae quod libero, ipsum minima, at necessitatibus vel suscipit dolorem ipsa facilis quia dolorum doloremque animi odit? Magni, omnis explicabo deleniti odit aut optio id asperiores beatae rerum mollitia molestias ea quas quam. Molestiae distinctio provident porro tenetur vero cum dolore optio cumque perferendis. Cum ad officia adipisci sapiente ea.`
          : `http://testcontent${index + 1}.com`,
      category: {
        type,
        name: `Category ${index % 3}`,
        thumbnail: `http://thumbnail${index}.com`,
      },
      theme: { name: `Theme ${index % 2}` },
      createdBy: { username: `user${index % 4}` },
    };
  });

  beforeEach(() => {
    (fetchContents as Mock).mockResolvedValue(mockContents);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders content list", async () => {
    render(<ContentList />);

    expect(await screen.findByText("Test Content 5")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Content 5"})).toBeInTheDocument();
  });

  test("filters contents by category", async () => {
    render(<ContentList filterType="category" filterValue="video" />);

    expect(await screen.findByText("Test Content 4")).toBeInTheDocument();
    expect(screen.queryByText("Test Image")).toBeNull();
  });

  test("filters contents by theme", async () => {
    render(<ContentList filterType="theme" filterValue="Theme 1" />);
    await waitFor(() => {
      expect(screen.getByText("Test Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Test Image")).toBeNull();
    });
  });

  test("opens and closes modal with selected content", async () => {
    render(<ContentList />);
    const [showMoreButton] = await screen.findAllByText("Show more");
    fireEvent.click(showMoreButton);
    await waitFor(() => {
      expect(screen.getByText("Close")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(screen.queryByText("Close")).toBeNull();
    });
  });

  test("paginates contents", async () => {
    render(<ContentList />);

    expect(await screen.findByText("Test Content 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("2"));
    expect(screen.queryByText("Test Content 1")).toBeNull();
  });
});
