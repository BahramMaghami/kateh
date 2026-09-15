import { test, expect } from "@playwright/test";

test("export loads Persian text, local images, and safe preview details", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page).toHaveTitle("کته | عطر برنج، طعم گیلان");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("طعم گیلان");
  await expect(page.locator(".menu-item")).toHaveCount(14);
  await expect(page.locator("#sour-chenjeh .menu-price")).toContainText("۹۳۵٬۰۰۰");
  await expect(page.locator("#local-kateh .menu-price")).toContainText("۱٬۹۴۵٬۰۰۰");
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.getByText("اطلاعات تماس به‌زودی", { exact: true })).toBeVisible();
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  }
  expect(requests.filter((url) => !url.startsWith("http://127.0.0.1:3100"))).toEqual([]);
  expect(errors).toEqual([]);
});

test("categories work with keyboard and featured links restore hidden foods", async ({ page }) => {
  await page.goto("/");
  const kateh = page.getByRole("button", { name: /کته‌ها/ });
  await kateh.focus();
  await page.keyboard.press("Enter");
  await expect(kateh).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".menu-item")).toHaveCount(5);
  await expect(page.locator("#sour-chenjeh")).toHaveCount(0);
  await page.getByRole("link", { name: "مشاهدهٔ کباب چنجه ترش در منو" }).click();
  await expect(page.locator(".menu-item")).toHaveCount(14);
  await expect(page.locator("#sour-chenjeh")).toBeInViewport();
  await kateh.click();
  await expect(page.locator("#sour-chenjeh")).toHaveCount(0);
  await page.getByRole("link", { name: "مشاهدهٔ کباب چنجه ترش در منو" }).click();
  await expect(page.locator("#sour-chenjeh")).toBeInViewport();
  await page.getByRole("button", { name: /کباب‌ها/ }).click();
  await expect(page.locator(".menu-item")).toHaveCount(9);
  await page.getByRole("button", { name: /همهٔ غذاها/ }).click();
  await expect(page.locator(".menu-item")).toHaveCount(14);
});

test("responsive layouts fit and section links navigate", async ({ page }, testInfo) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.setViewportSize(testInfo.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  if (testInfo.project.name === "mobile") {
    await page.getByRole("navigation", { name: "دسترسی سریع" }).getByRole("link", { name: "ارتباط با کته" }).click();
    await expect(page.locator("#visit")).toBeInViewport();
    await page.getByRole("navigation", { name: "دسترسی سریع" }).getByRole("link", { name: "مشاهدهٔ منو" }).click();
  } else {
    await page.getByRole("navigation", { name: "ناوبری اصلی" }).getByRole("link", { name: "منوی کته" }).click();
  }
  await expect(page.locator("#menu-title")).toBeInViewport();
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-hero.png`), scale: "css" });
  await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}.png`), fullPage: true, scale: "css" });
});
