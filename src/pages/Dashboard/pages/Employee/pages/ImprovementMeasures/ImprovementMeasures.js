import React from 'react';
import { Routes, Route } from 'react-router-dom';

import List from './components/List/List';
import View from './components/View/View'
import Registration from './components/Registration/Registration'
import Update from './components/Update/Update'

const ImprovementMeasures = () => {

    return (
        <Routes>
            <Route path="list" element={<List />} />
            <Route path="registration" element={<Registration />} />
            <Route path="view/:id" element={<View />} />
            <Route path="update/:updateid" element={<Update />} />
        </Routes >
    );
};

export default ImprovementMeasures;
