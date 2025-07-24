const modelConfig = {
    pageName: 'role',
    header: {
        newTitle: '新建角色',
        editTitle: '编辑角色'
    },
    formItems: [
        {
            type: 'input',
            prop: 'name',
            label: '角色名称',
            placeholder: '请输入角色名称',
            initialValue: '海贼王'
        },
        {
            type: 'input',
            prop: 'intro',
            label: '角色描述',
            placeholder: '请输入角色描述'
        },
        {
            type: 'custom',
            prop: 'menulist',
            slotName: 'menulist'
        }
    ]
};

export default modelConfig;
