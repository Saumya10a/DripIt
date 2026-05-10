import { Redirect } from 'expo-router';

const AuthRoot = () => {
    return <Redirect href="/(auth)/sign-in" />;
};

export default AuthRoot;