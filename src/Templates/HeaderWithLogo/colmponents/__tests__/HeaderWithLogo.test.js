import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import { useNavigate } from "react-router-dom";
import HeaderWithLogo from "../HeaderWithLogo";
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("HeaderWithLogo", () => {
    test("renders the logo correctly", () => {
        render(
            <BrowserRouter>
                <HeaderWithLogo />
            </BrowserRouter>
        );

        const logoLink = screen.getByRole("link", { name: /advertisement/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink.getAttribute("href")).toBe("/");
    });
});