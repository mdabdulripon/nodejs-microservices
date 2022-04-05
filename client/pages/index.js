import BuildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    return (
        currentUser ? (
            <h1>You are Sign In</h1>
        ) : (
            <h1>You are Not Sign In</h1>
        )
    )
}

// All the server-side rendering logic is placed here at getInitialProps
LandingPage.getInitialProps = async (context) => {
    const { data } = await BuildClient(context).get('/api/users/currentUser');
    return data;
}

export default LandingPage;