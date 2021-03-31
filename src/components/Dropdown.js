import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { options } from '../const';

const Dropdown = props => {
    let initialOption;
    if (props.match.path === "/scenicSpot/:city") {
        initialOption = options[props.match.params.city] || { label: '--- 請選擇欲查詢地區 ---', value: '' };
    } else if (props.match.path === "/scenicSpot") {
        initialOption = options['All'];
    } else {
        initialOption = { label: '--- 請選擇欲查詢地區 ---', value: '' };
    }
    const [selectedOption, setSelectedOption] = useState(initialOption);

    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = e => {
            if (!ref.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        }
    }, []);

    const renderOptions = () => Object.values(options).map(option => {
        if (option.value === selectedOption.value) {
            return null;
        }

        return (
            <Link
                key={option.value}
                className="item"
                to={`/scenicSpot${option.value === 'All' ? '' : `/${option.value}`}`}
                onClick={() => setSelectedOption(option)}
            >
                {option.label}
            </Link>
        );
    });

    return (
        <div ref={ref} className="ui form" style={{ marginBottom: '15px' }}>
            <div
                className={`ui fluid selection dropdown ${open ? 'visible active' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <i className="dropdown icon"></i>
                <div className="text">{selectedOption.label}</div>
                <div className={`menu ${open ? 'visible transition' : ''}`}>
                    {renderOptions()}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
