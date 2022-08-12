import React from 'react';
import { useParams } from 'react-router-dom';
import { DefaultLayout } from '../../../../../../layouts/Default';
import List from "./components/List/List"
import Registration from './components/Registration/Registration';
import View from './components/View/View';



const Notification = () => {
    const { page } = useParams()

    const [num, setNum] = React.useState('');

    const handleChange = (event) => {
        setNum(event.target.value);
    };

    return (
        <DefaultLayout>
            {page === "list" && <List />}
            {page === "registration" && <Registration />}
            {page === "view" && <View />}
        </DefaultLayout>
    );
};

export default Notification;
