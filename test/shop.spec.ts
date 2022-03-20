import { Shop } from "../src/shop";

test("register new user", async () => {
    let shop = new Shop();
    let status = await shop.registerUser({
        id: "1",
        email: "jorres.tarasov@gmail.com",
        lang: "ru",
    });

    expect(status).toBe(201);
});

test("register new user with the same id", async () => {
    let shop = new Shop();
    let status;
    status = await shop.registerUser({
        id: "1",
        email: "jorres.tarasov@gmail.com",
        lang: "ru",
    });
    expect(status).toBe(201);

    status = await shop.registerUser({
        id: "1",
        email: "jorres.tarasov.2@gmail.com",
        lang: "ru",
    });
    expect(status).toBe(400);
});

test("add new commodity", async () => {
    let shop = new Shop();
    let status = await shop.newCommodity({
        name: "Google Pixel 6",
        price: 2000,
        quantity: 1,
    });
    expect(status).toBe(201);
});

test("check prices are different based on language", async () => {
    let shop = new Shop();

    let status;

    status = await shop.registerUser({
        id: "1",
        email: "jorres.tarasov@gmail.com",
        lang: "ru",
    });
    expect(status).toBe(201);

    status = await shop.registerUser({
        id: "2",
        email: "joe.biden@gmail.com",
        lang: "us",
    });
    expect(status).toBe(201);

    let commodityPrice = 2000;
    let statusC = await shop.newCommodity({
        name: "Google Pixel 6",
        price: commodityPrice,
        quantity: 1,
    });
    expect(statusC).toBe(201);

    let items = [];

    let USDToRoubleRate = 150;
    let USDToUSDRate = 1;

    [status, items] = await shop.fetchList(1);
    expect(status).toBe(200);
    expect(items.length).toBe(1);

    expect(items[0].price).toBe(commodityPrice * USDToRoubleRate);

    [status, items] = await shop.fetchList(2);

    expect(status).toBe(200);
    expect(items.length).toBe(1);
    expect(items[0].price).toBe(commodityPrice * USDToUSDRate);
});
