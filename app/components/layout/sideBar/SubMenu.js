import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Fade from 'components/animation/Fade';
import MenuTitle from './MenuTitle';
import sideBarStyle from './SideBar1.scss';

const SubMenu = (props) => {
    const {subItems, name, expanded, timeout} = props;

    return [
        <MenuTitle key={name} name={name}/>,
        <Fade key="ss" duration={timeout} inProp={expanded} cssStyle={sideBarStyle}>
            <ul className={sideBarStyle.subMenu}>
                {
                    subItems.map((item, index) => {
                        const uniqueKey = new Date() + index;
                        return (<li key={uniqueKey} className={sideBarStyle.subMenu__item}>
                            <div className={sideBarStyle.subItem__title}>
                                <NavLink
                                    className={sideBarStyle.subItem__link}
                                    exact
                                    activeClassName={sideBarStyle.active}
                                    to={item.link}>{item.name}</NavLink>
                            </div>
                        </li>);
                    })
                }
            </ul>
        </Fade>
    ];
};

SubMenu.propTypes = {
    subItems: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
    timeout: PropTypes.number.isRequired
};

export default SubMenu;
