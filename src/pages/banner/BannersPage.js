import React, { useEffect, useState } from 'react';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableBanner/Table';
import ToolBar from './Toolbar';
import handlePromise from 'utils/handlePromise';
import apiGetBanners from 'apis/banner/apiGetBanners';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const [error, banners] = await handlePromise(apiGetBanners());

      if (error) return setBanners([]);

      return setBanners(banners);
    };

    fetchBanners();
  }, []);

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>
      <Divider />
      <Box mt={3}>
        <Table data={banners} />
      </Box>
    </Container>
  );
}
