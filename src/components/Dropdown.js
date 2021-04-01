import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { options } from '../const';

const Dropdown = ({ city }) => {
    const [selectedOption, setSelectedOption] = useState(options[city]);
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

    useEffect(() => {
        setSelectedOption(options[city]);
    }, [city]);

    const renderOptions = () => Object.values(options).map(option => {
        if (option.value === '' || option.value === selectedOption.value) {
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
            <div className="field">
                <label className="label">請選擇欲查詢地區：</label>
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
        </div>
    );
};

const mapStateToProps = state => {
    return {
        'city': state.city
    };
};

export default connect(mapStateToProps)(Dropdown);
