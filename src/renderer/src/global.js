const APIURL = 'http://localhost:3000/'
const ORDER_STATUS = {
    0: { text: '处理中', color: 'warning' },
    1: { text: '成功', color: 'success' },
    2: { text: '失败', color: 'danger' },
    3: { text: '删除', color: 'info' }
}
export default
    {
        APIURL,
        ORDER_STATUS
    }
