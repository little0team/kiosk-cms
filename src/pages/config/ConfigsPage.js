import React, { useEffect, useState } from 'react';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableConfig/Table';
import ToolBar from './Toolbar';
import handlePromise from 'utils/handlePromise';
import apiGetConfigs from 'apis/config/apiGetConfigs';

export default function ConfigsPage() {
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    const fetchConfigs = async () => {
      const [error, configs] = await handlePromise(apiGetConfigs());

      if (error) return setConfigs([]);

      return setConfigs(configs.data);
    };

    fetchConfigs();
  }, []);

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>

      <Divider />

      <Box mt={3}>
        <Table data={configs} />
      </Box>
    </Container>
  );
}
