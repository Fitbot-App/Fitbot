import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { BsFillInfoCircleFill } from 'react-icons/bs';

export default function CustomTooltip({ text }) {
  return (
    <div className='ml-5'>
      <Tooltip title={text}>
        <button sx={{ m: 1 }}>
          <BsFillInfoCircleFill color={'white'} size={20} />
        </button>
      </Tooltip>
    </div>
  );
}
