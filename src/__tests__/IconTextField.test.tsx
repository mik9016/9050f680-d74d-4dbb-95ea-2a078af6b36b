import React from 'react'
import { act, create } from 'react-test-renderer';
import SearchIcon from '@mui/icons-material/Search'

import { IconTextField } from '../components/IconTextField';


test(`renders IconTextField without crashing`, async () => {
  const root = create(
    <IconTextField label="Search" iconStart={<SearchIcon />} />
  );

  expect(root.toJSON()).toMatchSnapshot();

  act(() => {
    root.unmount();
  });
});
