import React from 'react';
import OwnerDashboardMain from './Dashboardowner';
import { getUserSession } from '@/lib/core/session';
import { getOwnerProperty } from '@/lib/api/getOwnerProperty';
import { getBookingAllData } from '@/lib/api/bookingData';

const page = async () => {
    const session = await getUserSession()
    const userEmail = session?.email
    const ownerProperty = await getOwnerProperty(userEmail)
    const BookingData = await getBookingAllData()
    console.log(ownerProperty);
    
    
    return (
        <div>
            <OwnerDashboardMain ownerProperty={ownerProperty} BookingData={BookingData} ></OwnerDashboardMain>
        </div>
    );
};

export default page;