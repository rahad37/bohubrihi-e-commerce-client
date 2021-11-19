import React from 'react';
import { useEffect } from 'react';
import Menu from './Menu';

const Layout = ({title= 'title', className, children}) => {
    useEffect(()=>{
        document.title = title;
    },[])

    return (
        <div>
            <div className="mb-3">
                <Menu/>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default Layout;