import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderWithLogo from "../../../../../../lab5-web/src/Templates/HeaderWithLogo/colmponents/HeaderWithLogo";

describe("HeaderWithLogo", () => {
    test("should render logo link correctly", () => {
        render(
            <BrowserRouter>
                <HeaderWithLogo />
            </BrowserRouter>
        );

        expect(screen.getByText("Advertisement")).toBeInTheDocument();
        expect(screen.getByText("Advertisement")).toHaveAttribute("href", "/");
    });
});
