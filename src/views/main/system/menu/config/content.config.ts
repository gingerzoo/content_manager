const contentConfig = {
    pageName: 'menu',
    header: {
        title: '菜单列表',
        btnTitle: '新建菜单'
    },
    pageList: [
        {
            prop: 'name',
            label: '菜单名称',
            width: '150px'
        },
        {
            prop: 'type',
            label: '级别',
            width: '120px'
        },
        {
            prop: 'url',
            label: '菜单url',
            width: '150px'
        },
        {
            prop: 'icon',
            label: '菜单icon',
            width: '200px'
        },
        {
            prop: 'sort',
            label: '排序',
            width: '90px'
        },
        {
            prop: 'permission',
            label: '权限',
            width: '150px'
        },
        {
            prop: 'createAt',
            type: 'timer',
            label: '创建时间'
        },
        {
            prop: 'updateAt',
            type: 'timer',
            label: '更新时间'
        },
        {
            type: 'handler',
            label: '操作',
            width: '180px'
        }
    ],
    childrenTree: {
        rowKey: 'id',
        treeProps: {
            children: 'children'
        }
    }
};

export default contentConfig;
