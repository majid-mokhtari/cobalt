import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: `InnerText`,
    dataIndex: 'innerText',
    key: 'innerText',
    width: 200
}, {
    title: 'InnerHtml',
    dataIndex: 'innerHtml',
    key: 'innerHtml',
}];
  
class ParseTable extends Component {

    getDataSource(data){
        if(!data){
            return null;
        }
        var items = null
        for(var key in data){
            items = data[key]
        }
        return items.map((item, i) => {
            return {
                key: i,
                innerText: item.innerText,
                innerHtml: item.innerHtml,
            }
        })
    }

    onTableRowClick(row){
        this.props.onTableRowClick(row);
    }

    render() {
        const { data } = this.props;
        const dataSource = this.getDataSource(data);
        return (
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                size="large"
                className="templates-table"
                pagination={{defaultPageSize: 10}}
            />
        );
    }
}

export default ParseTable;