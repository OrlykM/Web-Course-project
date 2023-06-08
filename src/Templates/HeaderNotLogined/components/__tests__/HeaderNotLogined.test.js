import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import { useNavigate } from "react-router-dom";
import HeaderNotLogined from "../HeaderNotLogined";

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
