import filesModel from "../model/files.model.js";
import { uploadFile } from '../libs/IBM.js'
import path from 'path'

const uploadContrtoller = {
    uploadDocument: async (req, res) => {
        const { File } = req.files;
        console.log(File)

        try {
            const fileExist = await filesModel.find({ hash: File.md5 });
            console.log(fileExist)

            if (fileExist.length > 0) return res.status(401).json({ message: 'Ya el archivo existe', status: 'Error' });

            uploadFile(File.name, File.data, res);

            const fileExt = path.extname(File.name).toLowerCase();

            const newFile = new filesModel({
                name: File.name,
                hash: File.md5,
                size: File.size,
                type: fileExt
            });

            newFile.save();

            res.json({ "message": "OK" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error de Servidor', status: 'Error' })
        }

    },
    getDocuments: async (req, res) => {
        try {
            const files = await filesModel.find();
            res.status(200).json(files);
        } catch (error) {
            res.status(500).json({ message: 'error del servidor getDoc', status: 'error' });
        }
    }
}

export default uploadContrtoller;