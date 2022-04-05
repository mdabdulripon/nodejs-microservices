
import { useEffect } from 'react';
import Router from 'next/router';
import UseRequest from './../../hooks/use-request';

export default function SignOut() {

    const { doRequest } = UseRequest({
        url: '/api/users/signOut',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, []);

    return (
        <div>Signing you out......</div>
    )
}