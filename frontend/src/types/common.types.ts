export type TEnvironment = "dev" | "staging" | "prod";

export interface IEnvironmentConfig {
  apiUrl: string;
  environment: TEnvironment;
}
