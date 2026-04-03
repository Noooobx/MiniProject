import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dfkegp9mp",
  api_key: "298279617783312",
  api_secret: "s3Qr7RWmiz58zO_Uu7tSV1iZKTo",
});

export default cloudinary;
