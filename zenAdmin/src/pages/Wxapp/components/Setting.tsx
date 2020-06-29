import React, { useState } from 'react';
import { Col,  Row } from 'antd';
import BaseFrom from './BaseFrom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient from '@/libs/apollo-graphql';
import { ApolloProvider } from 'react-apollo';

const apolloClient = ApolloClient('http://localhost:7001/graphql');
const GetSettingFrom = () => {
  const { loading, error, data } = useQuery(gql`
    {
      page(name:$page){
        form(name:$form){
          config
        }
      }
    }
  `, {
    variables: {
      page: 'wxapp', form: 'setting',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <p>{data.config}</p>
  );
};

export default () => {

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <GetSettingFrom/>
      </ApolloProvider>
      <Row>
        <Col>
          INSERT_BLOCK_PLACEHOLDER
          <BaseFrom/>
        </Col>
      </Row>
    </>
  );
};
