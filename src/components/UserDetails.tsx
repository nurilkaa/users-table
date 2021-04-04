import { Typography } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string;
}

const UserDetails = (props: RouteComponentProps<MatchParams>) => {
  const { id } = props.match.params;

  return (
    <Typography.Title>Пользователь с ID: {id}</Typography.Title>
  );
}

export default UserDetails;

