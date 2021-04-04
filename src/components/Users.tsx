import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table, Typography } from "antd";
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from "antd/lib/table";
import { FilterConfirmProps, FilterDropdownProps } from "antd/lib/table/interface";

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

const Users = () => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setTableData(data);
      });
  }, []);


  const columns: ColumnProps<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      dataIndex: '',
      key: 'details',
      render: (record) => <Typography.Link href={`/users/${record.id}`} target="_blank">Подробнее</Typography.Link>
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => (a.username).localeCompare(b.username),
      onFilter: (value, record) => {
        // console.log(value, record);
        return record['username'].toString().toLowerCase().includes(value.toString().toLowerCase());
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: {
        selectedKeys: React.Key[];
        clearFilters: () => void;
        setSelectedKeys: (selectedKeys: React.Key[]) => void;
        confirm: (param?: FilterConfirmProps) => void;
      }) =>
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Найти"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              if (e.target.value.length < 1) {
                clearFilters();
              }
            }}
            onPressEnter={() => confirm()}
            size="small"
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            disabled={selectedKeys.length < 1}
            style={{ width: 90, marginRight: 8 }}
          >
            Найти
			    </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            disabled={selectedKeys.length < 1}
            style={{ width: 90 }}
          >
            Очистить
			  </Button>
        </div>
      ,
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      sorter: (a, b) => (a.email).localeCompare(b.email)
    },
    {
      title: 'Website',
      dataIndex: 'website',
      sorter: (a, b) => (a.website).localeCompare(b.website)
    },
    {
      title: 'Действия',
      dataIndex: '',
      render: (record) => (
        <Popconfirm
          title="Вы уверены, что хотите удалить?"
          okText="Да"
          cancelText="Отменить"
          onConfirm={() => setTableData(tableData.filter((item: any) => item.id !== record.id))}
        >
          <DeleteOutlined style={{ color: 'red' }} />
        </Popconfirm>
      )
    }
  ];



  return (
    <div style={{ padding: 24 }}>
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        key="id"
        bordered
        pagination={{ pageSize: 5 }}
        title={() => <Typography.Title>Пользователи</Typography.Title>}
        rowSelection={{
          selectedRowKeys,
          onSelect: (record, selected, selectedRows) => {
            // console.log('onSelect: ', record, selected, selectedRows);
            if (selected)
              setSelectedRowKeys([...selectedRowKeys, record.id]);
            else
              setSelectedRowKeys([...selectedRowKeys.filter(key => key !== record.id)]);
          },
          getCheckboxProps: record => ({
            disabled: selectedRowKeys.length < 2 && selectedRowKeys[0] === record.id
          }),
          hideSelectAll: true
        }}
      />
    </div>
  );
};

export default Users;