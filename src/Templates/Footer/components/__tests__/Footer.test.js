import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../../../../lab5-web/src/Templates/Footer/components/Footer";

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
