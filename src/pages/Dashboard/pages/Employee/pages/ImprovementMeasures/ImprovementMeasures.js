import React from 'react';
import { useParams } from 'react-router-dom';
import { DefaultLayout } from '../../../../../../layouts/Default';

import List from './components/List/List';
import Registration from './components/Registration/Registration'



const ImprovementMeasures = () => {
    const { page } = useParams()
    console.log(page)

    return (
        <DefaultLayout>
            {page === "list" && <List />}
            {page === "registration" && <Registration />}
            {page === "modify" && <div>Modify</div>}
            {page === "view" && <div>View</div>}
        </DefaultLayout>
    );
};

export default ImprovementMeasures;
