import dotenv from 'dotenv'
import pkg from 'ibm-cos-sdk'
const { S3, Credentials } = pkg;


dotenv.config();

const cos = new S3({
    endpoint: process.env.COS_ENDPOINT,
    apiKeyId: process.env.COS_APIKEYID,
    ibmAuthEndpoint: process.env.COS_IBM_AUTH_ENDPOINT,
    serviceInstanceId: process.env.COS_RESOURCE_INSTANCE_ID,
    credentials: new Credentials(
        process.env.COS_HMAC_ACCESS_KEY_ID,
        process.env.COS_HMAC_SECRET_ACCESS_KEY,
        null
    ),
    signatureVersion: 'v4'
});

const uploadFile = async (name, data, res) => {
    try {
        await cos.putObject({
            Bucket: process.env.BucketName,
            Key: `${name}`,
            Body: data
        }).promise();
    } catch (error) {
        res.status(400).json({ "error": "Hubo un error al subir el documento, intente nuevamente." })
    }
}

const deleteFile = async (fileName) => {
    try {
        await cos.deleteObject({
            Bucket: process.env.BucketName,
            Key: fileName,
        }).promise();

        console.log(`El archivo ${fileName} ha sido eliminado exitosamente.`);

    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
    }
};

export { uploadFile, deleteFile };