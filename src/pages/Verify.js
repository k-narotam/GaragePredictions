import React, { useState } from 'react';
import axios from 'axios';

export default function Verify() {
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);

    const confirmToken = window.location.pathname.split('/')[2];
    console.log(confirmToken);

    axios.get(global.config.host + "/confirm_registration/" + confirmToken)
        .then(res => {
            if (res.data.error === '') {
                window.location.href = '/login';
            }
            else {
                setError(res.data.error);
                setIsError(true);
                setTimeout(() => {
                    window.location.href = '/login';
                }
                    , 3000);
            }
        });

    return (
        <div>
            {isError ?
                <div>
                    <h6>Something has gone wrong with verifying your account.
                        Please try opening the link again.</h6>
                    <h6>Response from server: {error}</h6>
                </div>
                :
                null
            }
        </div>

    );
}