import setHeader from "./header";

const uploadFile = function(args = {}) {
    return new Promise((resolve, reject) => {
        setHeader(args, 'file').then(e => {
            uni.uploadFile({
                url: args.url,
                filePath: args.filePath,
                name: 'file',
                fileType: args.fileType,
                formData: {
                    file: args.filePath,
                    file_name: args.fileName,
                    mch_id: args.mch_id
                },
                header: e,
                success: (uploadFile) => {
                    return resolve(uploadFile);
                },

                fail: (e) => {
                    return reject(e);
                }
            });
        })
    });
};

export default uploadFile