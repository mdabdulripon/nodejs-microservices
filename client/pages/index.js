import BuildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    console.log(currentUser);
    return <h1>Landing Page</h1>
}

// All the server-side rendering logic is placed here at getInitialProps
LandingPage.getInitialProps = async (context) => {
    const { data } = await BuildClient(context).get('/api/users/currentUser');
    return data;
}

export default LandingPage;