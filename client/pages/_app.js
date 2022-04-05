import 'bootstrap/dist/css/bootstrap.css';
import BuildClient from './../api/build-client';
import Header from '../components/header';

const AppComponent = ({Component, pageProps, currentUser}) => {
  return (
    <div>
      <Header currentUser={currentUser}/>
      <Component {...pageProps} />
    </div>
  )
};


AppComponent.getInitialProps = async (appContext) => {
  const { data } = await BuildClient(appContext.ctx).get('/api/users/currentUser')

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  console.log(pageProps);
  return {
    pageProps,
    ...data
  };
};

export default AppComponent; 