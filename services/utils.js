const getPreSignedURL = async (name)=>{
    let myBucket = 'nurse-app';
    // const myKey = `${Math.random().toString(36).replace(/[^a-z]+/g, '')}.jpeg`;
    const signedUrlExpireSeconds = 60 * 60  // 5/60 min in seconds
    let signedURL = await _s3.getSignedUrl('putObject', {
        Bucket: myBucket,
        Key: name, //myKey,
        Expires: signedUrlExpireSeconds,
        ACL:'public-read'
    });
    console.log('Signed Url',name,signedURL);
    return signedURL
}

exports = module.exports = {
    getPreSignedURL
}
