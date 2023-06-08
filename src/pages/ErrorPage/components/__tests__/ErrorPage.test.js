import React from "react";
import { render, screen } from "@testing-library/react";
import Error from "../Error";

describe("Error component", () => {
    test("should render error message with code 404", () => {
        render(<Error />);

        const errorMessage = screen.getByText("Sorry, an error has occurred. Please try again later.");
        const errorCode = screen.getByText("Error code: 404");

        expect(errorMessage).toBeInTheDocument();
        expect(errorCode).toBeInTheDocument();
    });
});
