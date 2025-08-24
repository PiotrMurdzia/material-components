import { Button, Container, Stack, Typography } from '@mui/material';

import React from 'react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="h3">{t('home.title')}</Typography>
        <Button variant="contained">{t('home.cta')}</Button>
      </Stack>
    </Container>
  );
};


