import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderNotLogined from "../../../../../../lab5-web/src/Templates/HeaderNotLogined/components/HeaderNotLogined";

describe("HeaderNotLogined", () => {
    test("should render header links correctly", () => {
        render(
            <BrowserRouter>
                <HeaderNotLogined />
            </BrowserRouter>
        );

        expect(screen.getByText("Advertisement")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.getByText("Log in")).toBeInTheDocument();
    });
});
