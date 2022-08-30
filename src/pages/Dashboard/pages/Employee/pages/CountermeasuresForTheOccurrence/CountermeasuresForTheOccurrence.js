import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '../../../../../../layouts/Default';

import List from './components/List/List';
import View from './components/View/View'
import Registration from './components/Registration/Registration';


const CountermeasuresForTheOccurrence = () => {

    return (
        <Routes>
            <Route path="list" element={<List />} />
            <Route path="registration/:id" element={<Registration />} />
            <Route path="view/:id" element={<View />} />
            {/* <Route path="update/:updateid" element={<Update />} /> */}
        </Routes >
    );
};

export default CountermeasuresForTheOccurrence

