const modelConfig = {
    pageName: 'department',
    header: {
        newTitle: '新建部门',
        editTitle: '编辑部门'
    },
    formItems: [
        {
            type: 'input',
            prop: 'name',
            label: '部门名称',
            placeholder: '请输入部门名称',
            initialValue: 'aaab'
        },
        {
            type: 'input',
            prop: 'leader',
            label: '部门领导',
            placeholder: '请输入部门领导'
        },
        {
            type: 'select',
            prop: 'parentId',
            label: '上级部门',
            placeholder: '请选择上级部门',
            options: []
        }
    ]
};

export default modelConfig;
