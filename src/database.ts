import { createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { commoditiesDocType, commoditiesSchema } from "./schemas/commodities";
import { userDocType, userSchema } from "./schemas/users";

import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';

addPouchPlugin(require('pouchdb-adapter-memory'));

type UserCollection = RxCollection<userDocType>;
type CommoditiesCollection = RxCollection<commoditiesDocType>;

export type myCollections = {
    users: UserCollection,
    commodities: CommoditiesCollection
}

export class Database {
    db: RxDatabase<myCollections> | null = null;
    initialized: boolean = false;
    onUsers: (event: any) => {};
    onCommodities: (event: any) => {};

    constructor(onUsers, onCommodities) {
        this.onUsers = onUsers;
        this.onCommodities = onCommodities;
    }

    async init() {
        if (this.initialized) {
            return;
        }

        this.db = await createRxDatabase({
          name: 'myshop' + Date.now().toString(),                   
          storage: getRxStoragePouch('memory'),
        });
        await this.populateWithData();
        this.initialized = true;
    }
    
    async populateWithData() {
        await this.db.addCollections({
            commodities: {
                schema: commoditiesSchema
            },
            users: {
                schema: userSchema
            },
        });

        this.db.commodities.$.subscribe(changeEvent => {
            this.onCommodities(changeEvent)
        });

        this.db.users.$.subscribe(changeEvent => {
            this.onUsers(changeEvent)
        });
    };

    async findCommodities() {
        if (!this.initialized) {
            await this.init();
        }

        return await this.db.commodities.find().exec();
    }

    async findUsers() {
        if (!this.initialized) {
            await this.init();
        }

        return await this.db.users.find().exec();
    }
}
