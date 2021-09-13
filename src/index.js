import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Row, Col, Input, Button, Table } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const SearchForm = () => {
  const [expand, setExpand] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'sex'
    }
  ];

  const getFields = () => {
    const count = expand ? 6 : 8;
    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`搜索项 ${i}`}
            rules={[
              {
                required: i === 0,
                message: '搜索信息必填'
              }
            ]}
          >
            <Input placeholder="请填入搜索信息" />
          </Form.Item>
        </Col>
      );
    }

    return children;
  };

  const getDatasource = async (query = {}) => {
    const result = await new Promise(resolve => {
      const result = [];
      Object.keys(query).forEach((queryKey, i) => {
        const queryValue = query[queryKey];
        if (queryValue) {
          result.push({
            key: i,
            name: queryValue,
            sex: queryValue.charCodeAt() % 2 === 0 ? '男性' : '女性'
          });
        }
      });
      resolve(result);
    });
    setDataSource(result);
  };

  useEffect(() => {
    getDatasource();
  }, []);

  const onSearch = query => {
    getDatasource(query);
    console.log('Received values of form: ', query);
  };

  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onSearch}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right'
            }}
          >
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{
                margin: '0 8px'
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
            <Button
              type="link"
              style={{
                fontSize: 12
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? (
                <>
                  <UpOutlined />
                  展开
                </>
              ) : (
                <>
                  <DownOutlined />
                  收起
                </>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

ReactDOM.render(
  <div>
    <SearchForm />
  </div>,
  document.getElementById('container')
);
