import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HeaderLogined from "../HeaderLogined";

describe("HeaderLogined", () => {
    test("renders the logo correctly", () => {
        render(
            <BrowserRouter>
                <HeaderLogined />
            </BrowserRouter>
        );

        const logoLink = screen.getByRole("link", { name: /advertisement/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink.getAttribute("href")).toBe("/");
    });

    test("renders all navigation links correctly", () => {
        render(
            <BrowserRouter>
                <HeaderLogined />
            </BrowserRouter>
        );

        const allAdsLink = screen.getByRole("link", { name: /all ads show/i });
        const profileLink = screen.getByRole("link", { name: /see profile/i });
        const createAdLink = screen.getByRole("link", { name: /create new ad/i });
        const settingsLink = screen.getByRole("link", { name: /settings/i });
        const exitLink = screen.getByRole("link", { name: /exit/i });

        expect(allAdsLink.getAttribute("href")).toBe("/ad");
        expect(profileLink.getAttribute("href")).toBe("/user");
        expect(createAdLink.getAttribute("href")).toBe("/ad/create");
        expect(settingsLink.getAttribute("href")).toBe("/user/settings");
        expect(exitLink.getAttribute("href")).toBe("/");
    });

    test("clears session and local storage on exit link click", () => {
        sessionStorage.setItem("Authorization", "token");
        localStorage.setItem("Authorization", "token");

        render(
            <BrowserRouter>
                <HeaderLogined />
            </BrowserRouter>
        );

        const exitLink = screen.getByRole("link", { name: /exit/i });
        fireEvent.click(exitLink);

        expect(sessionStorage.getItem("Authorization")).toBeNull();
        expect(localStorage.getItem("Authorization")).toBeNull();
    });
});
