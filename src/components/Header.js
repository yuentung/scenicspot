import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const Header = () => {
    const [selected, setSelected] = useState('--- 縣市 ---');
    const options = [
        { label: '臺北市', value: 'Taipei' },
        { label: '新北市', value: 'NewTaipei' },
        { label: '桃園市', value: 'Taoyuan' },
        { label: '臺中市', value: 'Taichung' },
        { label: '臺南市', value: 'Tainan' },
        { label: '高雄市', value: 'Kaohsiung' },
        { label: '基隆市', value: 'Keelung' },
        { label: '新竹市', value: 'Hsinchu' },
        { label: '新竹縣', value: 'HsinchuCounty' },
        { label: '苗栗縣', value: 'MiaoliCounty' },
        { label: '彰化縣', value: 'ChanghuaCounty' },
        { label: '南投縣', value: 'NantouCounty' },
        { label: '雲林縣', value: 'YunlinCounty' },
        { label: '嘉義縣', value: 'ChiayiCounty' },
        { label: '嘉義市', value: 'Chiayi' },
        { label: '屏東縣', value: 'PingtungCounty' },
        { label: '宜蘭縣', value: 'YilanCounty' },
        { label: '花蓮縣', value: 'HualienCounty' },
        { label: '臺東縣', value: 'TaitungCounty' },
        { label: '金門縣', value: 'KinmenCounty' },
        { label: '澎湖縣', value: 'PenghuCounty' },
        { label: '連江縣', value: 'LienchiangCounty' }
    ];

    return (
        <div style={{ display: 'flex' }}>
            <Link
                className="ui button"
                to="/scenicSpot"
                onClick={() => setSelected('--- 縣市 ---')}
            >
                所有地區
            </Link>
            <Dropdown
                selected={selected}
                onSelectedChange={setSelected}
                options={options}
            />
        </div>
    );
};

export default Header;
