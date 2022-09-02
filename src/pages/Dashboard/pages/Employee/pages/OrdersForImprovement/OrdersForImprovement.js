import React from 'react'
import { Route, Routes, useParams } from "react-router-dom";
import List from './components/List/List'
import Registration from './components/Registration/Registration';


const OrdersForImprovement = () => {
    return (
        <Routes>
            <Route path="list" element={<List />} />
            <Route path="registration" element={<Registration />} />
            {/* <Route path="view/:id" element={<View />} /> */}
            {/* <Route path="update/:updateid" element={<Update />} /> */}
        </Routes>
    )
}

export default OrdersForImprovement