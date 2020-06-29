import React from 'react';
import {Col, Row} from 'antd';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import ApolloClient from '@/libs/apollo-graphql';
import {ApolloProvider} from 'react-apollo';
import FormValidateStatic from './FormValidateStatic';

const apolloClient = ApolloClient('http://localhost:7001/graphql');

const GetSettingFrom = () => {
  const {loading, error, data} = useQuery(
    gql`
      {
        page(name: $page) {
          form(name: $form) {
            config
          }
        }
      }
    `,
    {
      variables: {
        page: 'wxapp',
        form: 'setting',
      },
    }
  );
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <p>{data?.config}</p>
      {error ? <p>Error :(</p> : ''}
      <FormValidateStatic formConfig={data?.config ?? {}}/>
    </>
  );
};

export default () => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <GetSettingFrom/>
        <Row>
          <Col>
            INSERT_BLOCK_PLACEHOLDER
          </Col>
        </Row>
      </ApolloProvider>
    </>
  );
};
