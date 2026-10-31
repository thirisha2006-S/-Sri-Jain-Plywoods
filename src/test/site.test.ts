import { describe, expect, it } from "vitest";
import { toWhatsAppNumber, WHATSAPP_NUMBER, waLink } from "@/data/site";

describe("WhatsApp number", () => {
  it("normalises the shop number 04427665382 to 914427665382", () => {
    expect(WHATSAPP_NUMBER).toBe("914427665382");
  });
  it("accepts +91 formatted numbers", () => {
    expect(toWhatsAppNumber("+91 44 2766 5382")).toBe("914427665382");
  });
  it("rejects numbers that are not 10 digits", () => {
    expect(() => toWhatsAppNumber("12345")).toThrow();
  });
  it("builds a wa.me link with encoded text", () => {
    expect(waLink("Hi there")).toBe("https://wa.me/914427665382?text=Hi%20there");
  });
});
