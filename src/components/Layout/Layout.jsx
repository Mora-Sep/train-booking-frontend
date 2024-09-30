import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserGlobalStateProvider } from "./UserGlobalState";
import { BookingStepGlobalStateProvider } from "./BookingStepGlobalState";
import { UserMenuGlobalStateProvider } from "./UserMenuGlobalState";
import { AuthFormGlobalStateProvider } from "./AuthFormGlobalState";

import Footer from "./../Footer";

export default function Layout({ children }) {
  const location = useLocation();
  const showFooter = location.pathname !== '/';

  return (
    <>
      <AuthFormGlobalStateProvider>
        <UserGlobalStateProvider>
          <UserMenuGlobalStateProvider>
            <BookingStepGlobalStateProvider>

              <div>{children}</div>
              {showFooter && <Footer />}

            </BookingStepGlobalStateProvider>
          </UserMenuGlobalStateProvider>
        </UserGlobalStateProvider>
      </AuthFormGlobalStateProvider>
    </>
  );
}
