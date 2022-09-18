import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import List from './components/List/List'
import Registration from './components/Registration/Registration';


const MeasureToManageThePerformance = () => {
    const [toggleList, setToggleList] = useState(false);

    const handleToggleList = (value) => {
        setToggleList(value);
    }

    return (
        <Routes>
            <Route path="list" element={<List handleToggleList={handleToggleList} toggleList={toggleList} />} />
            <Route path="registration" element={<Registration handleToggleList={handleToggleList} />} />
        </Routes>
    );
};

export default MeasureToManageThePerformance;
