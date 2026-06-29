import { requireRole } from '@/lib/core/session';
import React from 'react';

const layout = async({children}) => {
    await requireRole("admin")
    return (
        <div>
            {children}
        </div>
    );
};

export default layout;