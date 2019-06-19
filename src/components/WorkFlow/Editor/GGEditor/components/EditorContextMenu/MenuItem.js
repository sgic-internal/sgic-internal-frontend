import React from 'react';
import { Command } from 'gg-editor';
import upperFirst from 'lodash/upperFirst';
import IconFont from '../../common/IconFont';
import './index.css';

const MenuItem = props => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <div className="item">
        <IconFont type={`icon-${icon || command}`} />
        <span>{text || upperFirst(command)}</span>
      </div>
    </Command>
  );
};

export default MenuItem;
