import React from 'react';
import { useParams } from 'react-router-dom';
import { DefaultLayout } from '../../../../../../layouts/Default';

import List from './components/List/List';
import Registration from './components/Registration/Registration';


const CountermeasuresForTheOccurrence = () => {
    const { page } = useParams()

    return (
        <DefaultLayout>
            {page === "list" && <List />}
            {page === "registration" && <Registration />}
        </DefaultLayout>
    );
};

export default CountermeasuresForTheOccurrence

