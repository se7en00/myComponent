import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import {Accordion, AccordionItem, AccordionTitle, AccordionContent} from 'components/accordion';
import style from './sideBar.scss';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.renderItems = this.renderItems.bind(this);
    }

    static propTypes = {
        menuData: PropTypes.array.isRequired
    };

    renderTitle = (item) => {
        const {name, link, iconName = 'fa-question-circle'} = item;
        const hasSubMenu = Object.prototype.hasOwnProperty.call(item, 'subItems');
        const iconClass = cn('fa', iconName, style.title__icon);
        return (
            <AccordionTitle hideDownIcon={!hasSubMenu}>
                <i className={iconClass}/>
                <span className={style.title__link}>
                    {link ? <NavLink exact to={link}>{name}</NavLink> : name}
                </span>
                {hasSubMenu && <i className="fa fa-chevron-down"/>}
            </AccordionTitle>
        );
    }

    renderSubItems = ({subItems}) => {
        if (subItems) {
            const items = subItems.map((subItem, index) => {
                const uniqueKey = subItem.name + index;
                return (
                    <li key={uniqueKey} className={style.accordion__subItem}>
                        <div className={style.subItem__title}>
                            <NavLink className={style.subItem__link}
                                activeClassName={style.active}
                                exact
                                to={subItem.link}>{subItem.name}</NavLink>
                        </div>
                    </li>
                );
            });
            return (
                <AccordionContent rootTag="ul">
                    {items}
                </AccordionContent>
            );
        }
        return <AccordionContent rootTag="ul"/>;
    }

    renderItems() {
        const menuData = this.props.menuData;
        return menuData.map((item, index) => {
            const uniqueKey = item.name + index;
            return (
                <AccordionItem rootTag="li" key={uniqueKey}>
                    {this.renderTitle(item)}
                    {this.renderSubItems(item)}
                </AccordionItem>
            );
        });
    }

    render() {
        return (
            <nav className={style['c-sidebar']}>
                <Accordion
                    component="ul"
                    theme={style}
                    allowMultiple={true}
                    composeTheme={false}>
                    {this.renderItems()}
                </Accordion>
            </nav>
        );
    }
}

export default SideBar;
