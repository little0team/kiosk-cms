import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import handlePromise from 'utils/handlePromise';
import { openDialog } from 'features/dialog/alertMessageSlice';
import { AlertType } from 'constants/alertMessageType';
import { useHistory, useParams } from 'react-router';
import apiGetConfigById from 'apis/config/apiGetConfigByid';
import apiPostConfig from 'apis/config/apiPostConfig';
import apiPatchConfig from 'apis/config/apiPatchConfig';

const useStyles = makeStyles((theme) => ({
  root: {},
  bannerImageItem: {
    width: 200,
    marginTop: 10,
    color: 'transparent',
  },
}));

const ConfigPage = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { other: configId } = useParams();
  const isNewConfig = configId === 'new';
  const initValues = {
    type: '',
    name: '',
    value: '',
  };
  const [values, setValues] = useState(initValues);

  useEffect(() => {
    const fetchConfig = async () => {
      const [error, config] = await handlePromise(apiGetConfigById(configId));

      if (error) history.push('/app/configs');

      return setValues({
        type: config.type,
        name: config.name,
        value: config.value,
      });
    };

    if (!isNewConfig) {
      fetchConfig();
    } else {
      setValues(initValues);
    }
    // eslint-disable-next-line
  }, [configId]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const form = new FormData();

    form.append('type', values.type);
    form.append('name', values.name);
    form.append('value', values.value);

    if (isNewConfig) {
      var [createError] = await handlePromise(apiPostConfig(form));
    } else {
      var [updateError] = await handlePromise(apiPatchConfig(configId, form));
    }

    if (createError || updateError) {
      return dispatch(
        openDialog({
          message: `เกิดข้อผิดพลาด : ${createError}`,
          type: AlertType.ERROR,
        })
      );
    }

    dispatch(
      openDialog({ message: 'ทำรายการสำเร็จ', type: AlertType.SUCCESS })
    );

    return history.push('/app/configs');
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          subheader={isNewConfig ? 'Create Config' : 'Update Config'}
          title="Configuration"
        />

        <Divider />

        <CardContent>
          <TextField
            fullWidth
            label="Type"
            margin="normal"
            name="type"
            onChange={handleChange}
            type="text"
            value={values?.type}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values?.name}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Value"
            margin="normal"
            name="value"
            onChange={handleChange}
            type="text"
            value={values?.value}
            multiline
            rows={5}
            variant="outlined"
          />
        </CardContent>

        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {!isNewConfig ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ConfigPage;
