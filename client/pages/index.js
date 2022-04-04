import axios from 'axios';

const LandingPage = ({currentUser}) => {
    console.log(currentUser);
    return <h1>Landing Page</h1>
}

// All the server-side rendering logic is placed here at getInitialProps
LandingPage.getInitialProps = async ({ req }) => {
    if (typeof window === 'undefined') {
        /**
         * * we are in the server!
         * * node js does not have window object. Only browser does 
         * */  
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser',{ headers: req.headers});
        return data;
    } else {
        const { data } = await axios.get('/api/users/currentUser');
        return data;
    }
}

export default LandingPage;