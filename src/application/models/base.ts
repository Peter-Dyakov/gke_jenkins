import { Document, Model, Schema } from 'mongoose';

interface IDevOpsData {
	request: any
}

const DevopsDataSchema: Schema = new Schema(
	{
		request: { type: Schema.Types.Mixed }
	},
	{
		timestamps: true
	}
);

interface IDevOpsDataDoc extends IDevOpsData, Document { }

interface IDevOpsDataModel extends Model<IDevOpsDataDoc> {
	build(attrs: IDevOpsData): IDevOpsDataDoc;
}
const DEV_OPS_DTA_MODEL_NAME = 'DevOps';
const DEV_OPS_DTA_COLLECTION_NAME = 'DevOps';
const DEV_OPS_DATA_SCHEMA = DevopsDataSchema;

export {
	IDevOpsData,
	IDevOpsDataDoc,
	IDevOpsDataModel,
	DEV_OPS_DTA_MODEL_NAME,
	DEV_OPS_DTA_COLLECTION_NAME,
	DEV_OPS_DATA_SCHEMA
};
