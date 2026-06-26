import React from 'react';
import OwnerDashboardMain from './Dashboardowner';
import { getUserSession } from '@/lib/core/session';
import { getOwnerProperty } from '@/lib/api/getOwnerProperty';

const page = async () => {
    const session = await getUserSession()
    const userEmail = session?.email
    const ownerProperty = await getOwnerProperty(userEmail)
    console.log(ownerProperty);
    
    
    return (
        <div>
            <OwnerDashboardMain ownerProperty={ownerProperty} ></OwnerDashboardMain>
        </div>
    );
};

export default page;