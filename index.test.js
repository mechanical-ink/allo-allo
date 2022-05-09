const alloAllow = require("./allo-allo");

test("throws invalid number", async () => {
  await expect(await alloAllow()).toBe("{}");
});
