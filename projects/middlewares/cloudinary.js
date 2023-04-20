import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const uploadMulter = (req, res, next) => {
    cloudinary.config({
        cloud_name: "dxzlnojyv",
        api_key: "836484873263822",
        api_secret: "16RMwTwMOPjjaoeyzWRsIvZIHyM",
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "demo-upload",
            format: "png",
            public_id: "some_unique_id",
        },
    });

    const upload = multer({ storage: storage });
    req.files = upload.array("images", 10);
    next();
};
