import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
// import { TransitionGroup } from 'react-transition-group';
import {SUB_MENU} from 'constants/SidebarTree';
import SubMenu from './SubMenu';
import MenuTitle from './MenuTitle';
import sideBarStyle from './SideBar1.scss';

@CSSModules(sideBarStyle)
class SideBar1 extends React.Component {
    state = {
        activeItems: []
    }

    static propTypes = {
        menuDatas: PropTypes.array.isRequired
    }

    handleToggle(key) {
        let activeItems = this.state.activeItems;
        activeItems = [...activeItems];
        const index = activeItems.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
            // remove active state
            activeItems.splice(index, 1);
        } else {
            activeItems.push(key);
        }
        this.setState({
            activeItems
        });
    }

    hasSubItem = (item) => (
        Object.prototype.hasOwnProperty.call(item, SUB_MENU)
    );

    renderItems = () => {
        const that = this;
        return this.props.menuDatas.map((item, index) => {
            const uniqueKey = item.name + index;
            const expanded = (this.state.activeItems.indexOf(uniqueKey) !== -1);
            if (that.hasSubItem(item)) {
                return (
                    <li key={uniqueKey}
                        styleName="c-sidebar__item"
                        onClick={() => that.handleToggle(uniqueKey)}
                        role="menuitem">
                        <SubMenu {...item} expanded={expanded} timeout={600}/>
                    </li>
                );
            }
            return (
                <li key={uniqueKey} styleName="c-sidebar__item">
                    <MenuTitle {...item} hideDownIcon={true}/>
                </li>
            );
        });
    };

    render() {
        return (
            <nav styleName="c-sidebar" >
                <ul styleName="c-sidebar__list">
                    {this.renderItems()}
                </ul>
            </nav>
        );
    }
}

export default SideBar1;
