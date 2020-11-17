import React from 'react';

class TestApi extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            list: [],
            infoStatus: '',
            listStatus: '',
        };
        this.fetchInfo = this.fetchInfo.bind(this);
        this.fetchList = this.fetchList.bind(this);
        this.fetchAllApi = this.fetchAllApi.bind(this);
    }
    fetchList() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://127.0.0.1:4000/list');
        request.responseType = 'json';
        request.onload = () => {
            if (request.status === 200) {
                console.log(request.response);
                this.setState({
                    list: request.response.data || [],
                });
            } else {
                this.setState({
                    list: [],
                });
            }
            this.setState({
                listStatus: request.status,
            });
        };
        request.send();
    }
    fetchInfo() {
        var request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:4000/info');
        request.responseType = 'json';
        request.onload = () => {
            if (request.status === 200) {
                this.setState({
                    info: request.response.data || {},
                });
            } else {
                this.setState({
                    info: null,
                });
            }
            this.setState({
                infoStatus: request.status,
            });
        };
        request.send();
    }
    fetchAllApi() {
        this.fetchInfo();
        this.fetchList();
    }
    render() {
        const { list, listStatus, infoStatus, info } = this.state;
        return (
            <div
                style={{
                    textAlign: 'left',
                    position: 'absolute',
                    top: '26%',
                    left: '45%',
                }}
            >
                <div
                    style={{
                        padding: '10px',
                        border: '1px solid tan',
                    }}
                >
                    <div>接口信息：GET /list</div>
                    <div>状态码:{listStatus}</div>
                    <div>响应内容:</div>
                    <ul>
                        {
                            Array.isArray(list) ? list.map((item, i) => {
                                return (
                                    <li key={`${i}`}>{item}</li>
                                );
                            }) : null
                        }
                    </ul>
                    <button onClick={this.fetchList}>请求接口</button>
                </div>
                <div
                    style={{
                        padding: '10px',
                        border: '1px solid tan',
                        marginTop: '15px',
                    }}
                >
                    <div>接口信息：POST /info</div>
                    <div>状态码:{infoStatus}</div>
                    <div>响应内容:</div>
                    <div style={{ minHeight: '15px' }}>{info && JSON.stringify(info)}</div>
                    <button onClick={this.fetchInfo}>请求接口</button>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <button onClick={this.fetchAllApi}>请求所有接口</button>
                </div>
            </div>
        );
    }
}

export default TestApi;