import React, { useEffect, useState } from 'react';
import { getMenuOrderByCategory } from '../../services/menu/MenuService';
import AccountView from '../../views/account/AccountView';

function AccountController() {
  // Temporarily here just to test firebase data retrieval
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const setState = async () => setMenu(await getMenuOrderByCategory());
    setState();
  }, []);
  return <AccountView menu={menu} />;
}

export default AccountController;
