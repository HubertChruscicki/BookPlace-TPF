import React from 'react';
import { StyledAppBar, StyledToolbar } from './Header.styles';
import BookPlaceLogo from '../BookPlaceLogo';
import HeaderCenterSection from './HeaderCenterSection';
import HeaderUserSection from './HeaderUserSection';

interface HeaderProps {
  showSearch?: boolean;
  centerContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ showSearch = false, centerContent }) => {
  return (
    <StyledAppBar position="sticky" elevation={0}>
      <StyledToolbar>
        <BookPlaceLogo />
        <HeaderCenterSection showSearch={showSearch} centerContent={centerContent} />
        <HeaderUserSection />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

