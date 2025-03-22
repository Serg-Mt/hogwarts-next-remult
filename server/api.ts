import { remultNextApp } from "remult/remult-next";
import { createPostgresDataProvider } from "remult/postgres";
import { getUserFromRequest } from "./auth";
import { hogwarts } from '@/shared/entities/';
import { User } from '@/shared/entities/User';
import { createDemoData } from '@/shared/entities/demo-data';
import { Item } from '@/shared/entities/Item';

export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    console.debug("initApi");
    await User.createDemoUsers();
    await createDemoData();
  },
  dataProvider: createPostgresDataProvider({
    connectionString: process.env["DATABASE_URL"]
  }),
  admin: true,
  entities: [User, Item, ...hogwarts  ],
});

// console.debug("api.ts", api);