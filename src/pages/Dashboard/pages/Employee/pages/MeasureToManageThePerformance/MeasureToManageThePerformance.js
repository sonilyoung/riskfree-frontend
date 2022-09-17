import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom'
import { DefaultLayout } from '../../../../../../layouts/Default';
import List from './components/List/List'
import ListTwo from './components/ListTwo/ListTwo';
import Registration from './components/Registration/Registration';


const MPDLawFirst = () => {

    return (
        <Routes>
            <Route path="list" element={<List />} />
            <Route path="list-two" element={<ListTwo />} />
            <Route path="registration" element={<Registration />} />
        </Routes>
    );
};

export default MPDLawFirst;
