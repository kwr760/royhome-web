import React, { FunctionComponent, memo } from 'react';
import { FiGlobe, FiMonitor, FiUser } from 'react-icons/fi';
import { PlayerTypeEnum } from '../contracts/tictactoe.enum';

interface Props {
  type: PlayerTypeEnum;
}
type PlayerIconProps = Props;
export const PlayerIconComponent: FunctionComponent<PlayerIconProps> = ({ type }) => {
  switch (type) {
    case PlayerTypeEnum.Computer:
      return <FiMonitor />;
    case PlayerTypeEnum.Remote:
      return <FiGlobe />;
  }
  return <FiUser />;
};

export default memo(PlayerIconComponent);
