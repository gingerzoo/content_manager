const contentConfig = {
    pageName: 'role',
    header: {
        title: '角色列表',
        btnTitle: '新建角色'
    },
    pageList: [
        {
            type: 'selection',
            label: '选择',
            width: '80px'
        },
        {
            type: 'index',
            label: '序号',
            width: '80px'
        },

        {
            prop: 'name',
            type: 'normal',
            label: '角色名称',
            width: '150px'
        },
        {
            prop: 'intro',
            type: 'normal',
            label: '权限介绍',
            width: '180px'
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
    ]
};

export default contentConfig;
