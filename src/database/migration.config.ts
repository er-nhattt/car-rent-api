import { DataSource } from "typeorm";
import { getConfigDataSource } from "./dataSource.config";

export default new DataSource(getConfigDataSource());
