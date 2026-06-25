import React from 'react';
import TenantDashboardMain from './TenantDashboardMain';
import { getUserSession } from '@/lib/core/session';
import { getBookingUserData } from '@/lib/api/bookingData';
import { getFavoriteData } from '@/lib/api/favoriteData';


const page = async() => {
    const session = await getUserSession()
    const userId = session?.id
    
    const UserBooking = await getBookingUserData(userId)
    const FavoriteProperty = await getFavoriteData(userId)
    console.log(UserBooking);
    
    
    return (
        <div>
            <TenantDashboardMain FavoriteProperty={FavoriteProperty} UserBooking={UserBooking}></TenantDashboardMain>
        </div>
    );
};

export default page;