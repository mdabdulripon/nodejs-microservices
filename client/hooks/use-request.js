import axios from 'axios';
import { useState } from 'react';


export default function UseRequest({url, method, body, onSuccess}) {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const res = await axios[method](url, body);

            if (onSuccess) {
                onSuccess(res.data);
            }

            return res.data;
        } catch (err) {
            console.log("err", err)
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map((err, index) =>(<li key={index}>{err.message}</li>))}
                    </ul>
                </div>
            )
        }
    }

    return { errors, doRequest }
};