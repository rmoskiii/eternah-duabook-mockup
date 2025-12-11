import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Dua } from '../../types';

const DuaCard: React.FC<{ dua: Dua }> = ({ dua }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{dua.title}</Typography>
      <Typography variant="body2">{dua.text}</Typography>
    </CardContent>
  </Card>
);

export default DuaCard;

