import { renderHook, act } from "@testing-library/react-native";
import { useToggle } from "../../hooks/useToggle";

describe("useToggle", () => {
  it("should return status false by default", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.status).toBe(false);
  });

  it("should toggle status when toggleStatus is called", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.status).toBe(false);

    act(() => {
      result.current.toggleStatus();
    });

    expect(result.current.status).toBe(true);

    act(() => {
      result.current.toggleStatus();
    });

    expect(result.current.status).toBe(false);
  });
});
