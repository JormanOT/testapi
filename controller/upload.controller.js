import filesModel from "../model/files.model.js";
import { uploadFile } from '../libs/IBM.js'
import path from 'path'

const uploadContrtoller = {
    uploadDocument: async (req, res) => {
        const { File } = req.files;
        console.log(File)

        try {
            const fileExist = await filesModel.find({ name: File.name });
            console.log(fileExist)

            if (fileExist.length > 0) return res.status(401).json({ message: 'Ya el archivo existe', status: 'Error' });

            uploadFile(File.name, File.data, res);

            const fileExt = path.extname(File.name).toLowerCase();

            if (
                ext === '.pdf' ||
                ext === '.doc' ||
                ext === '.docx' ||
                ext === '.xls' ||
                ext === '.xlsx' ||
                ext === '.ppt' ||
                ext === '.pptx'
            ) {

                const newFile = new filesModel({
                    name: File.name,
                    hash: File.md5,
                    size: File.size,
                    type: fileExt
                });

                const file = await newFile.save();

                res.json(file);

            } else {
                res.status(401).json({ "message": "Archivo no Soportado" });
            }
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