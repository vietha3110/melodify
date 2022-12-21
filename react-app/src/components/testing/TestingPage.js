import { PutObjectCommand } from '@aws-sdk/client-s3';
import React, { useState } from 'react';
import client from '../../lib/s3/client';


const TestingPage = () => {

    const upload = () => {
        console.log(client);
        console.log('upload');

        const params = {
            'Bucket': 'melodify',
            'Key': 'abc.txt',
            'Body': 'hello world!'
        };

        const command = new PutObjectCommand(params);

        client.send(command);
    };

    return (
        <div>
            <button onClick={upload}>Upload</button>
        </div>
    );
}

export default TestingPage;
