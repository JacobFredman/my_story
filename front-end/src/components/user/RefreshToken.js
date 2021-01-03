import React, { useEffect, useContext } from 'react';
import FirebaseContext from '../../components/Firebase/context';



const RefreshToken = (props) => {
    const firebase = useContext(FirebaseContext);


    const refresh = () => {
        firebase.getTokenId()
            .then(tokenId => {
                console.log(tokenId);
                document.cookie = 'tokenId=' + tokenId + '; expires=' + new Date(new Date().setHours(new Date().getHours() + 1)) + '; path=/';
                props.setIsTokenRefreshed(true);
            }
            )
            .catch(() => { props.setIsTokenRefreshed(true); })
    }


    const checkUserAndRefresh = () => {
        firebase.auth.onAuthStateChanged(
            (user) => {
                // if (firebase.auth.currentUser) {
                if (user)
                    refresh();
                else
                    props.setIsTokenRefreshed(true); // for the app will run anyway
            });

        setTimeout(checkUserAndRefresh, 18000);
    }

    useEffect(() => {
        console.log('hi!!!!');
        checkUserAndRefresh();
    }, [])


    return (
        < div >
        </div >
    );
};

export default RefreshToken;