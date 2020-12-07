import React from 'react'
import { SCROLL } from "../utils/config"
import { ConfigProvider, Skeleton, Empty, Table } from "antd"

function TableComponent ({ loading, change, sizeChange, setPageSize, setCurrent, scroll=SCROLL, getDataSource, columns, selectedRowKeys, setSelectedRowKeys, dataSource, pageSize, total, current }) {

	function EmptyComponent () {
		if(loading) {
			return (
				<Skeleton active title={false} paragraph={{ rows: 10 }}/>
			)
		}

		return (
			<Empty
				style={{
					marginTop: 10,
					marginBottom: 10,
				}}
				image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
				imageStyle={{
					height: 60,
				}}
				description="暂无数据"
			>
			</Empty>
		)
	}

  const rowSelection = {
    onChange: selectedRowKeys => {
			setSelectedRowKeys(selectedRowKeys)
		},
    selectedRowKeys 
  }
	const onShowSizeChange = (current, size) => {
		if(sizeChange && typeof sizeChange === "function") {
			sizeChange(current, size)
		}else {
			setPageSize(size)
			setCurrent(current)
			getDataSource(current, size)
		}
	}
	const onChange = (...args) => {
    const { current } = args[0]
    if(change && typeof change === "function") {
      alert("sorter is null")
      change(current)
    }else {
      setCurrent(current)
      const sor = args[2] instanceof Array ? args[2] : [args[2]]
      getDataSource(sor.length ? 1 : current, sor)
    }
  }

	return (
		<ConfigProvider renderEmpty={EmptyComponent}>
			<Table
        onChange={onChange}
        sorter={true}
				columns={columns}
				rowSelection={selectedRowKeys ? {...rowSelection} : null}
				dataSource={dataSource}
				size="small"
				scroll={scroll}
				pagination={{
					pageSize,
					onShowSizeChange,
					pageSizeOptions:[10,20,50],
					showSizeChanger:true,
					showQuickJumper:true,
					current,
					showLessItems:true,
					total
				}}
			/>
		</ConfigProvider>
	)
}

export default TableComponent
