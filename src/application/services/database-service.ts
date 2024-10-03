import { DevOpsData } from "../models"

const saveRequestToDatabase = async (request: any) => {
    try {
        await DevOpsData.create({request});
    }
    catch (error: any) {
        const msg = `Error | error saving new record to database :: ${error?.message}`;
        console.error(msg);
        throw new Error(msg);
    }
}

export { saveRequestToDatabase }