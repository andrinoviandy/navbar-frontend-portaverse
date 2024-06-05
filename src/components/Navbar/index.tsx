import ModalPortal from '@components/Modals/ModalPortal';
import Provider from '@services/providers';

import HelpCenter from './HelpCenter';
import Messaging from './Messaging';
import Notification from './Notification';
import Platform from './Platform';
import Profile from './Profile';
import SearchBar from './SearchBar';

interface NavbarProps {
  platform?: string;
}

function Navbar({ platform }: NavbarProps) {
  return (
    <Provider>
      <ModalPortal />
      <nav className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-base-background bg-base-white px-5 py-2.5 shadow-navbar">
        <SearchBar />
        <div className="flex items-center gap-x-2 text-base-darkGray">
          {platform && <Platform platform={platform} />}
          <Messaging />
          <HelpCenter />
          <Notification />
          <Profile />
        </div>
      </nav>
    </Provider>
  );
}

export default Navbar;
