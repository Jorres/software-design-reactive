import { Database } from "./database";

export class Shop {
    users = [];
    commodities = [];
    updateCommodities = (event) => {
        let updatedCommodity = event.documentData;
        const i = this.commodities.findIndex(
            (elem) => elem.name == updatedCommodity.name
        );
        if (i != -1) {
            this.commodities[i] = updatedCommodity;
        } else {
            this.commodities.push(updatedCommodity);
        }
    };

    updateUsers = (event) => {
        let updatedUser = event.documentData;
        const i = this.users.findIndex((elem) => elem.name == updatedUser.name);
        if (i != -1) {
            this.users[i] = updatedUser;
        } else {
            this.users.push(updatedUser);
        }
    };

    database: Database;

    constructor() {
        this.database = new Database(this.updateUsers, this.updateCommodities);
    }

    showUsingLang = (lang: string, price: number) => {
        const langToCoef = {
            us: 1,
            eu: 0.9,
            ru: 150,
        };
        return price * langToCoef[lang];
    };

    fetchList = async (id: number): Promise<[number, any[]]> => {
        await this.database.init();
        let users = await this.database.findUsers();
        let currentUserId = users.findIndex((user) => user.get("id") == id);

        if (currentUserId == -1) {
            return [404, null];
        }

        let prices = this.commodities.map((commodity) => ({
            ...commodity,
            price: this.showUsingLang(
                users[currentUserId].get("lang"),
                commodity.price
            ),
        }));

        return [200, prices];
    };

    registerUser = async (newUser) => {
        await this.database.init();
        if (this.users.findIndex((user) => user.id == newUser.id) != -1) {
            return 400;
        }
        await this.database.db.users.insert(newUser);
        return 201;
    };

    newCommodity = async (newCommodity) => {
        await this.database.init();
        if (
            this.commodities.findIndex(
                (commodity) => commodity.name == newCommodity.name
            ) != -1
        ) {
            return 400;
        }
        await this.database.db.commodities.insert(newCommodity);
        return 201;
    };
}
