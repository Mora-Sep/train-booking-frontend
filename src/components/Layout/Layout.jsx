// import Header from "./Header";
import { UserGlobalStateProvider } from "./UserGlobalState";
import { BookingStepGlobalStateProvider } from "./BookingStepGlobalState";
// import { BookingProcessGlobalStateProvider } from "./BookingProcessGlobalState";
import { UserMenuGlobalStateProvider } from "./UserMenuGlobalState";
import { AuthFormGlobalStateProvider } from "./AuthFormGlobalState";
import Footer from "./../Footer";

export default function Layout({ children }) {
  return (
    <>
      <AuthFormGlobalStateProvider>
        <UserGlobalStateProvider>
          <UserMenuGlobalStateProvider>
            {/* <BookingProcessGlobalStateProvider> */}
            <BookingStepGlobalStateProvider>
              {/* <Header /> */}
              <div>{children}</div>
              <Footer />
            </BookingStepGlobalStateProvider>
            {/* </BookingProcessGlobalStateProvider> */}
          </UserMenuGlobalStateProvider>
        </UserGlobalStateProvider>
      </AuthFormGlobalStateProvider>
    </>
  );
}
