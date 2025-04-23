import { TEnvironment, IEnvironmentConfig } from "./types/common.types";

const getApiUrl = (env: TEnvironment): string => {
  switch (env) {
    case "prod":
      return "https://devil-fruit-database-crs-qehiib5lra-ue.a.run.app";
    case "dev":
    default:
      return "http://localhost:8000";
  }
};

const environment: TEnvironment =
  (import.meta.env.VITE_ENV as TEnvironment) || "dev";

export const config: IEnvironmentConfig = {
  apiUrl: import.meta.env.VITE_API_URL || getApiUrl(environment),
  environment,
};
