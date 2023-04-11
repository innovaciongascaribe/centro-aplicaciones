interface IDatabase {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface IServerConfiguration {
  database: IDatabase;
  appEnv: string;
}

export default function (): IServerConfiguration {
  return {
    database: {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
    },
    appEnv: process.env.APP_ENV || "DEVELOPMENT",
  };
}
