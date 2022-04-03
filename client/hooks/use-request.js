import axios from 'axios';
import { useState } from 'react';


export default function UseRequest({url, method, body}) {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const res = await axios[method](url, body);
            return res.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.errors.map((err, index) =>(<li key={index}>{err.msg}</li>))}
                    </ul>
                </div>
            )
        }
    }

    return { errors, doRequest }
};