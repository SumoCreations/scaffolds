import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { {{Name}}, {{Name}}Values } from "./{{Name}}";

const handleSubmit = async (values: {{Name}}Values) => {
  await new Promise((res) => setTimeout(res, 1000));
  return undefined;
};

test("should render the initial value", async () => {
  render(
    <{{Name}}
      defaultValues={ { {{defaultValues}} } }
      onSubmit={handleSubmit}
    />
  );
  expect(screen.getByDisplayValue("admin@example.com")).toBeInTheDocument();
  expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
});
