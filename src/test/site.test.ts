import { describe, expect, it } from "vitest";
import { toWhatsAppNumber, WHATSAPP_NUMBER, waLink } from "@/data/site";

describe("WhatsApp number", () => {
  it("normalises the shop number 9380713280 to 919380713280", () => {
    expect(WHATSAPP_NUMBER).toBe("919380713280");
  });
  it("accepts +91 formatted numbers", () => {
    expect(toWhatsAppNumber("+91 9380713280")).toBe("919380713280");
  });
  it("rejects numbers that are not 10 digits", () => {
    expect(() => toWhatsAppNumber("12345")).toThrow();
  });
  it("builds a wa.me link with encoded text", () => {
    expect(waLink("Hi there")).toBe("https://wa.me/919380713280?text=Hi%20there");
  });
});
