import { DataSource } from "typeorm";
import { getConfig } from "./dataSource.config";

const datasource = new DataSource(getConfig());
datasource.initialize();
export default datasource;