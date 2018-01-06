import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CSSModules from 'react-css-modules';
import { NavLink } from 'react-router-dom';
import sideBarStyle from './SideBar1.scss';

const MenuTitle = (props) => {
    const {name, link, hideDownIcon, iconName} = props;
    const iconClass = classNames('fa', iconName, sideBarStyle.title__icon);
    return (
        <div styleName="item__title">
            <i className={iconClass}/>
            <span styleName="title__link">
                {link ? <NavLink exact to={link}>{name}</NavLink> : name}
            </span>
            {!hideDownIcon && <i className="fa fa-chevron-down"/>}
        </div>
    );
};

MenuTitle.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    hideDownIcon: PropTypes.bool,
    iconName: PropTypes.string
};

MenuTitle.defaultProps = {
    link: '',
    iconName: 'fa-question-circle',
    hideDownIcon: false
};

export default CSSModules(MenuTitle, sideBarStyle);
