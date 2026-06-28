import React from 'react';
import AdminOverviewPage from './adminpage';
import { getAllUsers } from '@/lib/api/getAllUser';
import { TotalProperty } from '@/lib/api/allProperty';
import { getBookingAllData } from '@/lib/api/bookingData';

const MainAdminPage = async() => {
    const payload = await getAllUsers()
    const allproperty = await TotalProperty()
    const allBookingData = await getBookingAllData()
    console.log(allproperty,"admin");
    
    return (
        <div>
            <AdminOverviewPage allBookingData={allBookingData} allproperty={allproperty} allusers={payload}></AdminOverviewPage>
        </div>
    );
};

export default MainAdminPage;