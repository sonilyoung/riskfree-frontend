import React from 'react';
import { useParams } from 'react-router-dom'
import { DefaultLayout } from '../../../../../../layouts/Default';
import List from './components/List/List'
import ListTwo from './components/ListTwo/ListTwo'
import Registration from './components/Registration/Registration';


const MPDLawFirst = () => {
    const { page } = useParams()

    return (
        <DefaultLayout>
            {page === "list" && <List />}
            {page === "list-two" && <ListTwo />}
            {page === "registration" && <Registration />}
        </DefaultLayout>
    );
};

export default MPDLawFirst;
