import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dfkegp9mp",
  api_key: "883253737124756",
  api_secret: "RUKKzltNzn9rffU-CPybxYvzPsM",
});

export default cloudinary;
