import PropertyDetailsPage from '@/components/shared/properyDetailcard';
import { PropertyDetailId } from '@/lib/api/propertyDetail';
import React from 'react';

const PropertyDetail = async({params}) => {
    const {id}= await params
    console.log(id);
    
    const property= await PropertyDetailId(id)
    return (
        <div>
            <PropertyDetailsPage property={property}></PropertyDetailsPage>
        </div>
    );
};

export default PropertyDetail;