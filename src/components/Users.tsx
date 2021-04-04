import { Button, Input, PageHeader, Popconfirm, Table, Typography } from "antd";
import { resolve } from "node:path";
import React, { useEffect, useState } from "react";
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
  // id: 1,
  // name: "Leanne Graham",
  // username: "Bret",
  // email: "Sincere@april.biz",
  // address: {
  //   "street": "Kulas Light",
  //   "suite": "Apt. 556",
  //   "city": "Gwenborough",
  //   "zipcode": "92998-3874",
  //   "geo": {
  //     "lat": "-37.3159",
  //     "lng": "81.1496"
  //   }
  // },
  // phone: "1-770-736-8031 x56442",
  // website: "hildegard.org",
  // company: {
  //   name: "Romaguera-Crona",
  //   catchPhrase: "Multi-layered client-server neural-net",
  //   bs: "harness real-time e-markets"
  // }
}

const Users = () => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setTableData(data);
      })
  }, []);

  const columns: ColumnProps<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      // defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
      // showSorterTooltip: false
    },
    {
      // title: 
      dataIndex: '',
      key: 'details',
      render: (record) => (
        <Typography.Link href={`/users/${record.id}`} target="_blank">Подробнее</Typography.Link>
        // <a
        //   href={`/users/${record.id}`}
        //   target="_blank"
        //   rel="noopener noreferrer"
        // >
        //   Подробнее
        // </a>
      ) // <Link to={`link`} target="_blank">View</Link>
    },
    {
      title: 'Username',
      dataIndex: 'username',
      // sorter: (a, b) => a.username.length - b.username.length,
      sorter: (a, b) => (a.username).localeCompare(b.username),
      onFilter: (value, record) => {
        console.log(value, record);
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
                // onClearStateValue();
              }
            }}
            onPressEnter={() => {
              confirm();
              // onSetStateValue(filterDropdown.selectedKeys[0]);
            }}
            size="small"
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => {
              confirm();
              // onSetStateValue(filterDropdown.selectedKeys[0]);
            }}
            icon={<SearchOutlined />}
            size="small"
            disabled={selectedKeys.length < 1}
            style={{ width: 90, marginRight: 8 }}
          >
            Найти
			    </Button>
          <Button
            onClick={() => {
              clearFilters();
              // onClearStateValue();
            }}
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
      {/* <PageHeader title="Пользователи" /> */}
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        key="id"
        bordered
        pagination={{
          pageSize: 5
        }}
        title={() => <Typography.Title>Пользователи</Typography.Title>}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          // getCheckboxProps: record => ({
          //   // disabled: record.name === 'Disabled User', // Column configuration not to be checked
          //   // name: record.name,
          //   disabled: record.id === 
          // }),
          // hideDefaultSelections: true
          onSelect: (record, selected, selectedRows, nativeEvent) => {
            console.log('onSelect: ', record, selected, selectedRows, nativeEvent);
            if (selected)
              setSelectedRowKeys([...selectedRowKeys, record.id]);
            else
              setSelectedRowKeys([...selectedRowKeys.filter(key => key !== record.id)]);
            // if (selectedRows.length < 2) {
            //   record.
            // }
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