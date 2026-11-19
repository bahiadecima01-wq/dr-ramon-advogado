import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BrandedLoading } from "@/components/branded-loading";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Initial intro timing", () => {
  it("remains mounted until exactly 3000 milliseconds, even when document load fires", () => {
    vi.useFakeTimers();
    const { container } = render(<BrandedLoading />);
    act(() => { window.dispatchEvent(new Event("load")); vi.advanceTimersByTime(2999); });
    expect(container.firstChild).not.toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(container.firstChild).toBeNull();
  });

  it("does not restart for anchor navigation and starts again for a fresh document mount", () => {
    vi.useFakeTimers();
    const first = render(<BrandedLoading />);
    act(() => vi.advanceTimersByTime(3000));
    act(() => window.dispatchEvent(new HashChangeEvent("hashchange")));
    expect(first.container.firstChild).toBeNull();
    first.unmount();
    const fresh = render(<BrandedLoading />);
    expect(fresh.container.firstChild).not.toBeNull();
    act(() => vi.advanceTimersByTime(3000));
    expect(fresh.container.firstChild).toBeNull();
  });
});