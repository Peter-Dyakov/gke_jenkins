import {
	IDevOpsData,
	IDevOpsDataDoc,
	IDevOpsDataModel,
	DEV_OPS_DTA_MODEL_NAME,
	DEV_OPS_DTA_COLLECTION_NAME,
	DEV_OPS_DATA_SCHEMA
} from './base';

DEV_OPS_DATA_SCHEMA.statics.build = (attr: IDevOpsData) => {
	return new DevOpsData(attr);
};

const DevOpsData: IDevOpsDataModel = global.serviceDB.model<IDevOpsDataDoc, IDevOpsDataModel>(
	DEV_OPS_DTA_MODEL_NAME,
	DEV_OPS_DATA_SCHEMA,
	DEV_OPS_DTA_COLLECTION_NAME
);

export { DevOpsData };
