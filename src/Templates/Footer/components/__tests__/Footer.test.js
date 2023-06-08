import React from "react";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
describe("Footer", () => {
    test("should render footer content correctly", () => {
        render(<Footer />);

        expect(screen.getByText("Online Marketplace")).toBeInTheDocument();
        expect(screen.getByText("(123) 456-7890")).toBeInTheDocument();
        expect(screen.getByText("info@onlinemarketplace.com")).toBeInTheDocument();
    });

    test("should render copyright text correctly", () => {
        render(<Footer />);

        expect(
            screen.getByText("© 2023 Online Marketplace. All Rights Reserved.")
        ).toBeInTheDocument();
    });
});
