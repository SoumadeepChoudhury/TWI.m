"use client"

import { useEffect, useState } from 'react';
import { Auth } from '@/components/auth/page';
import './global.css'
import Cookies from 'js-cookie';
import { Home } from '@/components/home/home';

export default function TWIMApp() {
  const [comp, setComp] = useState(null);
  useEffect(() => {
    setComp(Cookies.get("username") == undefined ? <Auth /> : <Home />);
  }, [])

  return (
    comp
  );
}
