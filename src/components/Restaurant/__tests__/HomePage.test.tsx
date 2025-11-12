import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import Providers from "@/app/providers";

// Mock the image validation function
jest.mock("@/app/layout", () => ({
  RootLayout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Home page Rendering", () => {
  it("renders the home page", async () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );

    // Verify the navbar
    expect(screen.getByTestId("food-header-section")).toBeInTheDocument();

    // Verify the hero section
    expect(screen.getByTestId("food-hero-section")).toBeInTheDocument();

    // Verify the feature-meals section
    expect(
      screen.getByTestId("food-feature-meals-section")
    ).toBeInTheDocument();

    // Verify the footer section
    expect(screen.getByTestId("food-footer-section")).toBeInTheDocument();
  });
});
