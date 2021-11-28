import React from 'react';
import { useSelector } from 'react-redux';

import DefaultNav from '../common/DefaultNav';
import UserNav from '../common/UserNav';

const Header = () => {
    const user = useSelector((state) => state.user);

    return <div>{user.email && user._id ? <UserNav /> : <DefaultNav />}</div>;
};

export default Header;
